from flask import Flask

app = Flask(__name__)

@app.route('/')
def inicio():
    return "Esta es la pagina d eInicio"

@app.route('/destino')
def destino():
    return "Pagina de Destino"


@app.route('/restaurantes')
def restaurantes():
    return "Pagina de Restaurantes"


@app.route('/eventos')
def eventos():
    return "Pagina de eventos"

@app.route('/transportes')
def transportes():
    return "Pagina de Tranportes"

@app.route('/bar-disco')
def bardisco():
    return "Pagina de Bar-Disco"


@app.route('/contacto')
def contacto():
    return "Pagina de Contacto"


@app.route('/saludo/<nombre>')
def saludo_nombre(nombre):
    return f"hola, {nombre}"

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)