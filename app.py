from flask import Flask, render_template,request,jsonify, session
import json, os,csv

app = Flask(__name__)
app.secret_key = "yWb2f@QOf77R9hhEX@sFYdt8cc7&LC2S"

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
    
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
