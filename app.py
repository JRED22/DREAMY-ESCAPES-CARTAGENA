from flask import Flask, render_template,request,jsonify, session,send_from_directory,redirect
import os,csv
from werkzeug.utils import secure_filename
from flask_mysqldb import MySQL

import mysql.connector
from mysql.connector import Error
app = Flask(__name__)
# Configuración de la base de datos
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'dreamyescapes'

mysql = MySQL(app)

app.secret_key = "yWb2f@QOf77R9hhEX@sFYdt8cc7&LC2S"
archivo_add__csv = "data/tours.csv"
# Función para revisar si el usuario está autenticado
def revisar_sesion():
  if ('usuario' in session):
    return True
  else:
    return False
@app.route('/login', methods=['GET'])
def login_formulario():
  if revisar_sesion():
    return render_template("dashboard.html", titulo="Usuarios autenticados")
  
  return render_template("login.html", titulo="Ingreso a usuarios")

@app.route('/login', methods=['POST'])
def login_validar():
  if revisar_sesion():
    return render_template("dashboard.html", titulo="Usuarios autenticados")
  
  if request.form.get("login") == "admin" and request.form.get(
      "password") == "123456":
    session['usuario'] = "admin"
    return render_template("dashboard.html", titulo="Usuarios autenticados")
  else:
    return render_template("login.html", titulo="Usuario no autenticado")

@app.route('/logout')
def logout():
  session.pop('usuario', None)
  return render_template("index.html", titulo="Página de Inicio")

@app.route('/')
def index():
    return render_template("index.html", titulo="Página de Inicio")


@app.route('/destinos')
def destino():  
    return render_template("destinos.html")


@app.route('/restaurantes')
def restaurantes():
    return render_template("restaurantes.html")



@app.route('/transportes')
def transportes():
     return render_template("transportes.html")


@app.route('/sitios-turisticos')
def sitiosturisticos():
    return render_template("sitiosturisticos.html")
 
@app.route('/tours')
def tours():
     return render_template("tours.html",titulo="Tours")

@app.route('/playas')
def playas():
    return ("playas")
@app.route('/contacto', methods=['GET'])
def contacto():
     return render_template("contacto.html", titulo="Contáctenos!!!")


@app.route('/contacto', methods=['POST'])
def guardar_contacto():
  name = request.form.get("inputName")
  email = request.form.get("inputEmail")
  phone = request.form.get("inputPhone")
  message = request.form.get("inputMessage")


  archivo_csv = "data/contactos.csv"
  
  # Validaciones
  if name == "" or email == ""  or phone == ""  :
    validacion = "Error: No hay datos para contacto."
  else:
    # La información se almacenará en la base de datos
    validacion = "Gracias por contactarnos, pronto nos pondremos en contacto con usted." 
    # Crear el archivo si no existe, adicionando la cabecera
    if os.path.exists(archivo_csv) == False:
      with open(archivo_csv, "w") as archivo:
        archivo.write("name,email,address1,address2,phone,city,state,zip,message\n")  
    # Adicionar la información al archivo desde el formulario de contacto.
    with open(archivo_csv, "a") as archivo:
      archivo.write(f"{name},{email},{phone},{zip},{message}\n") 
  return render_template("contacto.html",titulo="Pronto te contactaremos.",
                         validacion=validacion)


@app.route('/mapa')
def mapa():
    return render_template ("mapa.html")

@app.route('/team')
def teams():
    return render_template("team.html",titulo="Grupo de Trabajo")

@app.route('/bardisco')
def bardisco():
    return render_template("bardisco.html", titulo="Bares y Discotecas")

@app.route('/saludo/<nombre>')
def saludo_nombre(nombre):
    return "hola, {nombre}"
def load_tours():
    tours = []
    with open('data/tours.csv', 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            tours.append(row)
    return tours 
    
@app.route('/api/tours', methods=['GET'])
def get_tours():
    
   
     precio_tour= request.args.get('precio_tour', '')
     duracion_tours= request.args.get('duracion_tours', '')
     categoria_tours = request.args.get('categoria_tours', '')
     
     tours = load_tours()
     
    # Filtrar por precio
     if precio_tour== 'p_menor_tours':
         tours = [t for t in tours if int(t['precio_tour']) <= 8000]
     elif precio_tour== 'p_mayor_tours':
         tours = [t for t in tours if int(t['precio_tour']) > 120000]

     # Filtrar por duración
     if duracion_tours :
          tours = [t for t in tours if t['duracion_tours'] == duracion_tours ]
     
      # Filtrar por categoría
     if categoria_tours :
         tours = [t for t in tours if t['categoria_tours'] == categoria_tours]

     return jsonify(tours)
 
@app.route('/admin', methods=['GET'])
def mostrar_formulario():
    return render_template('admin.html')
 #---------------------------------------------------------------------------------tour-----------------------------
@app.route('/agregar_tour', methods=['POST'])
def agregar_tour():
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'message': 'Datos inválidos.'}), 400

    # Archivo CSV donde se guardan los tours
    archivo_tours_csv = 'data/tours.csv'

    # Verificar si el archivo ya existe
    archivo_existe = os.path.isfile(archivo_tours_csv)

    try:
        with open(archivo_tours_csv, 'a', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            
            # Si el archivo es nuevo, escribir la cabecera
            if not archivo_existe:
                writer.writerow(['id', 'titulo', 'precio_tour', 'duracion_tours', 'categoria_tours', 'image_url', 'description'])
            
            # Leer el archivo para calcular el siguiente id
            id_contador = 1
            if archivo_existe:
                with open(archivo_tours_csv, 'r', newline='', encoding='utf-8') as read_file:
                    reader = csv.reader(read_file)
                    next(reader, None)  # Saltar los encabezados
                    # Contar las filas existentes y asignar el siguiente id
                    id_contador = sum(1 for row in reader) + 1
            
            # Escribir la nueva fila con el id auto-incrementable
            writer.writerow([id_contador, data['titulo_add'], data['precio_add'], data['duracion_add'], data['categoria_add'], data['image_url_add'], data['descripcion_add']])
            
        return jsonify({'success': True, 'message': f'Tour agregado con id {id_contador}.'})

    except Exception as e:
        print(f"Error al guardar los datos: {e}")
        return jsonify({'success': False, 'message': 'Error al guardar los datos.'}), 500
@app.route('/add_tours')
def add_tours():
    return render_template("add_servicio.html")
@app.route('/listar_tours')
def listartours():
    return render_template("listar_servicio.html")

#------------------------------------------------------------------------------------imagenes con formulario
    
def obtener_ultimo_id(archivo_add__csv):
    if not os.path.exists(archivo_add__csv):
        return 0  # Si el archivo no existe, el ID empieza en 0
    with open(archivo_add__csv, "r") as archivo:
        lineas = archivo.readlines()
        if len(lineas) <= 1:  # Solo tiene la cabecera o está vacío
            return 0
        # Filtrar líneas no vacías y no cabeceras
        for linea in reversed(lineas[1:]):  # Leer desde la última línea hacia atrás, omitiendo la cabecera
            if linea.strip():  # Verificar que la línea no esté vacía
                try:
                    ultimo_id = int(linea.split(",")[0])  # Extraer el ID
                    return ultimo_id
                except ValueError:
                    continue  # Saltar líneas inválidas
        return 0  # Si no se encuentra un ID válido


@app.route('/add_tours', methods=['POST'])
def guardar_tours():
    app.config['UPLOAD_FOLDER'] = 'static/uploads'
    #poner id a linea
    ultimo_id = obtener_ultimo_id(archivo_add__csv)
    nuevo_id = ultimo_id + 1  # Incrementar el ID
    if request.method == 'POST':
  # obtenemos el archivo del input "archivo"
     titulo_add = request.form.get("titulo_add")
    precio_add = request.form.get("precio_add")
    duracion_add = request.form.get("duracion_add")
    categoria_add = request.form.get("categoria_add")
    # image_url_add = request.form.get("image_url_add")
    descripcion_add = request.form.get("descripcion_add")
    f = request.files['image_url_add']
    filename = secure_filename(f.filename) 
    
    extension = os.path.splitext(filename)[1]
    nuevo_nombre = f"{categoria_add}_{secure_filename(descripcion_add[:10])}".lower()  # Usa la categoría y una parte de la descripción
    nombre_completo = f"{nuevo_nombre}{extension}"
    
    # Guardamos el archivo en el directorio "Archivos PDF"
    f.save(os.path.join(app.config['UPLOAD_FOLDER'],  nombre_completo ))
    ruta= ('/static/uploads/')+nombre_completo
    
  # Retornamos una respuesta satisfactoria
#   # Validaciones
    if  titulo_add == "" or precio_add == ""  or duracion_add == "" or categoria_add== "" or descripcion_add== "" :
     validacion = "Error: No hay datos para contacto."
    else:
    # La información se almacenará en la base de datos
     validacion = "Gracias por contactarnos, pronto nos pondremos en contacto con usted." 
#     # Crear el archivo si no existe, adicionando la cabecera
     if os.path.exists(archivo_add__csv) == False:
       with open(archivo_add__csv, "w") as archivo:
         archivo.write("id,titulo,precio_tour,duracion_tours,categoria_tours,image_url,description\n")  
#     # Adicionar la información al archivo desde el formulario de tours.
      
    with open(archivo_add__csv, "a") as archivo:
      archivo.write(f"{nuevo_id},{titulo_add},{precio_add},{duracion_add},{categoria_add},{ruta},{descripcion_add}\n") 
      return render_template("dashboard.html",titulo="Pronto te contactaremos.",
                          validacion=filename)
    #return "<h1>Archivo subido exitosamente</h1>"
#--------------------------------------------------------------------------base de datos ojo 
@app.route('/listar')
def listar_servicios():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM usuarios")
    data = cur.fetchall()
    return render_template('listar_user.html', data=data)
@app.route('/add_user')
def cargar_formuser():
 return render_template('add_user.html')

@app.route('/add_user', methods=['POST'])
def add():
    if request.method == 'POST':
        nombre_user = request.form['nombre_user']
        apellido_user = request.form['apellido_user']
        email_user = request.form['email_user']
        contrasena_user = request.form['contrasena_user']
    
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO usuarios (nombre, apellido, correo , perfil) VALUES (%s, %s,%s, %s)", (nombre_user, apellido_user,email_user,contrasena_user))
        
        # cur.execute("INSERT INTO usuarios (nombre, apellido, email, edad) VALUES (%s, %s, %s, %s)", 
        #     (nombre, apellido, email, edad))
        mysql.connection.commit()
        return render_template('/dashboard.html',message="Operación realizada con éxito")

@app.route('/edit/<id>', methods=['GET', 'POST'])
def edit(id):
    cur = mysql.connection.cursor()
    if request.method == 'POST':
        nombre = request.form['nombre']
        cur.execute("UPDATE tu_tabla SET nombre = %s WHERE id = %s", (nombre, id))
        mysql.connection.commit()
        return redirect('/')
    cur.execute("SELECT * FROM tu_tabla WHERE id = %s", (id,))
    data = cur.fetchone()
    return render_template('dashboard.html', data=data)

@app.route('/delete/<int:id>')
def delete(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM usuarios WHERE id_usuario = %s", (id,))
    mysql.connection.commit()
    return render_template('dashboard.html',message="Usuario Eliminado con éxito")
 
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
