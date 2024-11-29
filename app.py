from flask import Flask, render_template,request
import json, os

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

@app.route('/saludo/<nombre>')
def saludo_nombre(nombre):
    return "hola, {nombre}"

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
    
    
    
     
                 
                 
                