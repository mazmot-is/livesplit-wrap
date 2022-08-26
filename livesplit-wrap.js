const appendMsg = function(msg) {
  const p = document.createElement('p');
  p.appendChild(document.createTextNode(msg));
  const div = document.querySelector('.scroller>div');
  div.appendChild(p);
}

const generateKeyframeContent = function(msgs) {
  let content = "@keyframes vslide {\n";
  const n = msgs.length;
  const tick = 100 / n;
  const baseLineHeight = computeLineHeight('.scroller>div>p');
  for (let i in msgs) {
    i = parseInt(i);
    const at = tick * i;
    const height = baseLineHeight * i;
    const atTransient = tick * (i + 1) - (tick * config.transientRatio);
    content += `${at}% { transform: translateY(-${height}px); }\n`
    content += `${atTransient}% { transform: translateY(-${height}px); }\n`
  }
  content += "}\n";
  return content;
}

const computeLineHeight = function(query) {
  const el = document.querySelector(query);
  const height = window.getComputedStyle(el, null).getPropertyValue('line-height');
  return parseInt(height);
}

const appendKeyframes = function(msgs) {
  const content = generateKeyframeContent(msgs);
  const style = document.createElement('style')
  style.type = 'text/css';
  style.innerHTML = content;
  document.head.appendChild(style);
  
  const sec = config.msgShowSecond * msgs.length;
  document.querySelector('.scroller>div').style.animation = `vslide ${sec}s ease infinite`;
}

const getCurrentTime = function() {
  const now = new Date();
  return now.getFullYear() + '/' + (now.getMonth()+1)  + '/' +   now.getDate()
                           + ' ' + now.getHours() + ':' + now.getMinutes();
}
const updateTime = function() {
  const time = document.querySelector('.scroller>div').lastChild.innerText = getCurrentTime();
  
}
////////////////////////////////////////////////////////////////////////////////
//config.msgs.push(getCurrentTime());
config.msgs.forEach(appendMsg);
appendKeyframes(config.msgs);


//setInterval(updateTime(), 60*1000);
