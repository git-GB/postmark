document.getElementById('template-selector').addEventListener('change', function() {
  applyStyle(this.value);
});

document.getElementById('download-button').addEventListener('click', function() {
  html2canvas(document.getElementById('preview')).then(function(canvas) {
    let link = document.createElement('a');
    link.download = 'styled-markdown.jpg';
    link.href = canvas.toDataURL('image/jpg');
    link.click();
  });
});

function applyStyle(template) {
  let markdownText = document.getElementById('markdown-input').value;
  let htmlContent = convertMarkdownToHTML(markdownText);
  let previewDiv = document.getElementById('preview');
  previewDiv.className = template;
  previewDiv.innerHTML = htmlContent;

  // Scale content to fit within the container
  const contentHeight = previewDiv.scrollHeight;
  const containerHeight = previewDiv.offsetHeight;
  if (contentHeight > containerHeight) {
    const scale = containerHeight / contentHeight;
    previewDiv.style.transform = `scale(${scale})`;
  } else {
    previewDiv.style.transform = previewDiv.style.transform.replace(/scale\((\d+\.?\d*)\)/, '');
  }
}

function convertMarkdownToHTML(markdown) {
  return marked.parse(markdown);
}