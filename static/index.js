//Crear la variable date - (fecha).
var date = new Date()
var display_date = "Fecha: " + date.toLocaleDateString()

//Cargar HTML DOM.
$(document).ready(function(){
    $("#display_date").html(display_date)
})
//Definir la variable para almacenar la emoción predecida.
var predicted_emotion;

//HTML-->JavaScript--->Flask.
//Flask--->JavaScript--->HTML.

//Selector jQuery y la acción click.

$(function () {
    $("#predict_button").click(function () {
        //Llamada a AJAX 
        var input_data = {
            "text": $("#text").val()
        }
        $.ajax({
            
            type:"POST",
            url:"/predict_emotion",
            data:JSON.stringify(input_data),
            dataType:"JSON",
            contentType:"application/JSON",
            success: function(result)
              {
                
                // Resultado recibido de Flask ----->JavaScript
                predicted_emotion = result.data.predicted_emotion
                emo_url = result.data.predicted_emotion_img_url
                // Mostrar resultado usando JavaScript----->HTML
                $("#prediction").html(predicted_emotion);
                $("#prediction").css("display", "block");
                $("#img_url").attr("src", emo_url);
                $("#img_url").css("display", "block");
              },
            //Función error 
            error: function(result){
                alert(result.responseJSON.message)
            }
        });
    });
})

