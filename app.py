from flask import Flask, render_template,request,jsonify
import json, os,csv

app = Flask(__name__)

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
    
   
     price= request.args.get('price', '')
     duration = request.args.get('duration', '')
     category = request.args.get('category', '')
     
     tours = load_tours()

    # Filtrar por precio
     if price== 'low':
         tours = [t for t in tours if int(t['price']) <= 8000]
     elif price== 'high':
         tours = [t for t in tours if int(t['price']) > 120000]

     # Filtrar por duración
     if duration == 'half-day':
          tours = [t for t in tours if t['duration'] == 'half-day']
     elif duration == 'full-day':
          tours = [t for t in tours if t['duration'] == 'full-day']

      # Filtrar por categoría
     if category:
         tours = [t for t in tours if t['category'] == category]

     return jsonify(tours)
                 
                 
                

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
