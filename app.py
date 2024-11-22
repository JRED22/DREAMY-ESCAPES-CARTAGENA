from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("index.html")

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
   return render_template("tours.html")

@app.route('/playas')
def playas():
    return ("playas")

@app.route('/contacto')
def contacto():
    return render_template("contacto.html")

@app.route('/mapa')
def mapa():
   return render_template ("mapa.html")

@app.route('/saludo/<nombre>')
def saludo_nombre(nombre):
    return "hola, {nombre}"

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
    
    
    
     
                 
                 
                