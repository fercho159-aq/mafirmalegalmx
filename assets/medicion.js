// Conversión de Google Ads "Clic a WhatsApp" (cuenta 530-343-4909).
// Cuenta cualquier salida a WhatsApp desde el sitio: ligas a wa.me y ventanas abiertas con window.open
// (formulario de contacto y consulta guiada). La etiqueta base gtag se carga en el <head> de cada página.
(function () {
  var CONVERSION = 'AW-18554490523/EdnWCN_9lLIdEJudvI9F';
  var esWhatsApp = function (url) { return /wa\.me|whatsapp\.com/i.test(String(url || '')); };

  function contar(alTerminar) {
    var listo = false;
    var seguir = function () { if (!listo) { listo = true; if (alTerminar) alTerminar(); } };
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', { send_to: CONVERSION, event_callback: seguir });
      setTimeout(seguir, 600);
    } else {
      seguir();
    }
  }

  // Ligas a WhatsApp (botón flotante, botones de cada área, encabezado, pie)
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || !esWhatsApp(a.href)) return;
    var mismaPestana = !a.target || a.target === '_self';
    if (mismaPestana && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      // Espera a que salga la conversión antes de cambiar de página
      e.preventDefault();
      contar(function () { location.href = a.href; });
    } else {
      contar();
    }
  }, true);

  // Formularios que abren WhatsApp en otra pestaña
  var abrir = window.open;
  window.open = function (url) {
    if (esWhatsApp(url)) contar();
    return abrir.apply(window, arguments);
  };
})();
