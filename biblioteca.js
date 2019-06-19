//armar objetos
function armaMarca(marca,descripcion){
  var contenedor = $('<div></div>').addClass('col-6 hiden')
                   .append(
                          $('<h6>'+marca+'</h6>').addClass('my-0')
                          .append(
                                  $('<span>'+1+'</span>').addClass('badge badge-success mm cantidad')
                          )
                   )
                   .append(
                          $('<small>'+descripcion+'</small>').addClass('text-muted')
                   )

  return contenedor
}

function armarPrecio(precio, descripcion){
  var contenedor = $('<div></div>').addClass('col-3')
                   .append(
                           $('<h6>$</h6>').addClass('my-0')
                           .append(
                                  $('<span>'+precio+'</span>').addClass('precio')
                           )
                   )
                   .append(
                          $('<small>'+descripcion+'</small>').addClass('text-muted')
                   )

  return contenedor
}

function armarSubtotal(subtotal, descripcion){
  var contenedor = $('<div></div>').addClass('col-3')
                   .append(
                          $('<h6>$'+subtotal+'</h6>').addClass('my-0 text-right subtotal')
                   )
                   .append(
                          $('<p></p>').addClass('text-right')
                          .append(
                                  $('<small>'+descripcion+'</small>').addClass('text-muted')
                          )
                   )

  return contenedor
}

function CREAR_PRODUCTO(producto){
  var fila = $('<li></li>',{
    'class': 'list-group-item d-flex justify-content-between lh-condensed fondo',
    'id': producto.id
  }).append(
            $('<div></div').addClass('row pp')
            .append(
                    armaMarca(producto.marca, producto.descripcion)
            )
            .append(
                    armarPrecio(producto.precio, 'p/unitario')
            )
            .append(
                    armarSubtotal(producto.precio, 'subtotal')
            )
            )

  return fila
}



// setter ang getters

function getPrecio(id){
  return parseFloat( $('#'+id+' .precio').text() )
}

function getSubtotal(id){
  return parseFloat($('#'+id+' .subtotal').text())
}

function getCant(id){

  return parseFloat( $('#'+ id +' .cantidad').text() )
}

function setPrecio(id, value){
  $('#'+id+' .precio').text(value)
}

function setSubtotal(id, value){
  $('#'+id+' .subtotal').text(value)
}

function setCantidad(id, value){
  $('#'+id+' .cantidad').text(value)
}

//grid metods

function gridInsertar(producto){
  $('ul').append(producto)
}

// crud

function agregarAlGrid(producto){
  nuevoProducto = CREAR_PRODUCTO(producto)
  setCantidad(producto.id,1)
  setPrecio(producto.id, producto.precio)
  setSubtotal(producto.id, producto.precio)

  gridInsertar(nuevoProducto)
}

function actualizarGrid(id,cantidad,agregar){

  nuevaCantidad = agregar ? getCant(id) + parseFloat(cantidad) : getCant(id) - parseFloat(cantidad)
  nuevoSubtotal = getPrecio(id) * nuevaCantidad

  console.log('nuevaCantidad->'+nuevaCantidad)
  console.log('nuevoSubtotal->'+nuevoSubtotal)
  setCantidad(id, nuevaCantidad)
  setSubtotal(id, nuevoSubtotal)

}



// main

$(document).ready(function(){

  var curr = 0

  $('.codigoBarras').keyup(function(e){
    if(e.which == 13){
      id = $(this).val()
      console.log(id)
      if ( (id === '') || !(id in articulos) ){
        $('#flash').removeClass('hideme')
        $(this).val('')
        return
      }

      if ( $('#'+id).length > 0){
        actualizarGrid(id,1,1)
        console.log('existe el producto')
      }
      else{
        if (id in articulos){
        agregarAlGrid( articulos[id])
        }
      }
      $(this).val('')
    }
  });

  $('ul').on('click', 'li', function(){
    curr = $(this).attr('id')
    //alert(curr)

    if ( $(this).hasClass('focusme')){
      $(this).removeClass('focusme')
      curr = 0
    }
    else{
      $('.focusme').removeClass('focusme')
      $(this).addClass('focusme')
      curr = $(this).attr('id')
    }
  })



  //test
  $('#bt1').on('click', function(){
    var cantidad = $('#'+ curr +' .cantidad') // span
    var precio = $('#'+ curr +' .precio') //span
    var subtotal = $('#'+ curr +' .subtotal') //span

    var nuevaCantidad = parseFloat( cantidad.text() ) + 1

    var nuevoSubtotal = parseFloat(subtotal.text()) + parseFloat( precio.text() )

    cantidad.text(nuevaCantidad)
    subtotal.text(nuevoSubtotal)
  })

  $('#flash').on('click', function(){
    $(this).addClass('hideme')
  })

  $('#bt2').on('click', function(){

    var cantidad = $('#'+ curr +' .cantidad') // span
    var precio = $('#'+ curr +' .precio') //span
    var subtotal = $('#'+ curr +' .subtotal') //span

    var nuevaCantidad = parseFloat( cantidad.text() ) - 1

    if (nuevaCantidad == 0){
      $('#'+ curr).remove()
      curr = 0
      return
    }

    var nuevoSubtotal = parseFloat(subtotal.text()) - parseFloat( precio.text() )

    cantidad.text(nuevaCantidad)
    subtotal.text(nuevoSubtotal)
  })

});
