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

function getTOTAL(){
  return parseFloat( $('.TOTAL').text())
}

function setTOTAL(value){
  $('.TOTAL').text(value)
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

  nuevototal = getTOTAL() + parseFloat(producto.precio)

  gridInsertar(nuevoProducto)
  setTOTAL(nuevototal)
}

function actualizarGrid(id,cantidad,agregar){

  nuevaCantidad = agregar ? getCant(id) + parseFloat(cantidad) : getCant(id) - parseFloat(cantidad)
  nuevoSubtotal = getPrecio(id) * nuevaCantidad
  nuevototal = agregar ? getTOTAL() + getPrecio(id) * cantidad : getTOTAL() - getPrecio(id) * cantidad
  console.log('nuevaCantidad->'+nuevaCantidad)
  console.log('nuevoSubtotal->'+nuevoSubtotal)
  console.log('nuevoTOTAL->'+nuevototal)
  setCantidad(id, nuevaCantidad)
  setSubtotal(id, nuevoSubtotal)
  setTOTAL(nuevototal)

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
  $('#flash').on('click', function(){
    $(this).addClass('hideme')
  })

  $('#borrar').on('click', function(){

    if (curr == 0) return

    actualizarGrid(curr,1,false)
    nuevaCantidad = getCant(curr)
    if (nuevaCantidad == 0){
      $('#'+ curr).remove()
      curr = 0
      return
    }

  })

});
