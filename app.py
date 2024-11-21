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


@app.route('/eventos')
def eventos():
    return render_template("eventos.html")

@app.route('/transportes')
def transportes():
    return render_template("transportes.html")


@app.route('/bar-disco')
def bardisco():
     return render_template("bardisco.html")
 
@app.route('/gastronomia')
def gastronomia():
     return  "gastronomia"
 
@app.route('/tours')
def tours():
    return ("tours")

@app.route('/playas')
def playas():
    return ("playas")

@app.route('/contacto')
def contacto():
    return render_template("contacto.html")

@app.route('/atracciones')
def atracciones():
    return ("atracciones")

@app.route('/promociones')
def promociones():
    return ("promociones")

@app.route('/mapa')
def mapa():
    return ("mapa")


@app.route('/saludo/<nombre>')
def saludo_nombre(nombre):
    return "hola, {nombre}"

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
    
    
    
     
                 
                 
                