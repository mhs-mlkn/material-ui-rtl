export default function resizableGrid(table, callback) {
  var row = table.getElementsByTagName('tr')[0],
  cols = row ? row.children : undefined;
  if (!cols) return;
  
  table.style.overflow = 'hidden';
  
  var tableHeight = table.offsetHeight;
  
  for (var i=0;i<cols.length - 1;i++){
    if(!cols[i].hasGrip){  
      cols[i].hasGrip = true;
      var div = createDiv(tableHeight);
      div.innerHTML="|";
      cols[i].appendChild(div);
      cols[i].style.position = 'relative';
      setListeners(div);
    }
  }
 
  function setListeners(div){
   var pageX,curCol,nxtCol,curColWidth,nxtColWidth;
 
   div.addEventListener('mousedown', function (e) {
    curCol = e.target.parentElement;
    nxtCol = curCol.nextElementSibling;
    pageX = e.pageX;
  
    var padding = paddingDiff(curCol);
  
    curColWidth = curCol.offsetWidth - padding;
    if (nxtCol)
     nxtColWidth = nxtCol.offsetWidth - padding;
   });
 
   div.addEventListener('mouseover', function (e) {
    e.target.className="tableColDragHnadler";
    // e.target.style.borderRight = '2px solid #0000ff';
   })
 
   div.addEventListener('mouseout', function (e) {
    e.target.className="";
    // e.target.style.borderRight = '';
   })
 
   document.addEventListener('mousemove', function (e) {
    if (curCol) {
     var diffX = pageX - e.pageX;
  
     if (nxtCol)
      nxtCol.style.width = (nxtColWidth - (diffX))+'px';
 
     curCol.style.width = (curColWidth + diffX)+'px';
    }
   });
 
   document.addEventListener('mouseup', function (e) { 
     callback(curCol);
    curCol = undefined;
    nxtCol = undefined;
    pageX = undefined;
    nxtColWidth = undefined;
    curColWidth = undefined
   });
  }
  
  function createDiv(height){
   var div = document.createElement('div');
   div.style.top = "12.5px";
   div.style.left = 0;
   div.style.width = '1px';
   div.style.position = 'absolute';
   div.style.cursor = 'col-resize';
   div.style.userSelect = 'none';
   div.style.height = height + 'px';
   return div;
  }
  
  function paddingDiff(col){
  
   if (getStyleVal(col,'box-sizing') === 'border-box'){
    return 0;
   }
  
   var padLeft = getStyleVal(col,'padding-left');
   var padRight = getStyleVal(col,'padding-right');
   return (parseInt(padLeft) + parseInt(padRight));
 
  }
 
  function getStyleVal(elm,css){
   return (window.getComputedStyle(elm, null).getPropertyValue(css))
  }
 };