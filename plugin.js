jQuery(document).ready(function($){
// CEP FIELD
    $("#billing_postcode").blur(async function(){
    // SETUP DEFAULT ADDRESS FIELDS
      var checkoutFields = {
        cep: 'billing_postcode',
        cidade: 'billing_city',
        estado: 'billing_state',
        bairro: 'billing_neighborhood',
        endereco: 'billing_address_1'
      };
      autoFillAddress(checkoutFields, this.value);
	});
  
  // FUNCTION TO AUTO FILL ADDRESS
  function autoFillAddress(fields, cep)
  {
    jQuery.ajax({
      url: window.location.origin+'?wc-ajax=correios_autofill_address&postcode='+cep,
      method: 'GET', 
      dataType: "JSON",
       beforeSend: function () {
         $.blockUI({ message: '<strong>Carregando dados do CEP ...</strong>' });
      }
    }).done(function(response) {
       if(response.success)
       {
         $.unblockUI();
         $("[name='"+fields.cidade+"']").val(response.data.city);
         $("[name='"+fields.endereco+"']").val(response.data.address);
         $("[name='"+fields.bairro+"']").val(response.data.neighborhood);
         $("[name='"+fields.estado+"']").val(response.data.state).trigger("change");
       } else {
         $.blockUI({ 
            message: '<strong>Cep inválido!</strong>', 
            timeout: 2000
        });
       }
    }).fail(function(jqXHR, textStatus, errorThrown) {
    //handle error here
      $.unblockUI();
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
  });
  }
});
