window.addEventListener('load', function() {

    // referenciar controles de pantalla
    const msgSuccess = this.document.getElementById('msgSuccess');
    const btnCerrarSesion = this.document.getElementById('btnCerrarSesion');

    // recuperar nombre de usuario
    const result = JSON.parse(this.localStorage.getItem('result'));

    // mostrar nombre de usuario en alerta
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);

    // listener para cerrar sesión
    btnCerrarSesion.addEventListener('click', cerrarSesion);
});

function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}

async function cerrarSesion() {

    const url = 'http://localhost:8082/login/cerrar-async';
    const request = {
        tipoDocumento: localStorage.getItem('tipoDocumento'),
        numeroDocumento: localStorage.getItem('numeroDocumento')
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        
        if (result.resultado) {
            // Limpiar sesión y redirigir a la página de login
            localStorage.clear();
            window.location.replace('login.html');
        } else {
            console.log( "Error: " + result.mensajeError);
        }

    } catch (error) {
        console.log('Error al cerrar sesión', error);
    }
}
