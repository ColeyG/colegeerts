function coldAjax(coldAjaxMethod, coldAjaxUrl, coldAjaxProcessor) {
  const coldHttpRequest = new XMLHttpRequest();

  function processRequest() {
    if (coldHttpRequest.readyState === XMLHttpRequest.DONE) {
      if (coldHttpRequest.status === 200) {
        const data = coldHttpRequest.responseText;
        const resp = data;
        coldAjaxProcessor(resp);
      } else {
        const resp = 'Failed Request!';
        coldAjaxProcessor(resp);
      }
    }
  }

  function loading() {
    if (!coldHttpRequest) {
      // eslint-disable-next-line no-alert
      alert('Request Failed!');
    }
    coldHttpRequest.onreadystatechange = processRequest;
    coldHttpRequest.open(coldAjaxMethod, coldAjaxUrl, true);
    coldHttpRequest.send();
  }

  loading();
}
