console.log('generative')
let app = angular.module('generative', []);
app.directive('generativeBg', ['$timeout', $timeout => {
  console.log('inside directive')
  let body;
  const iluminator = grid => {
    $timeout( () => {
      let randomRow = Math.floor( Math.random() * grid.length );
      let row = grid[randomRow];
      let randomColumn = Math.floor( Math.random() * row.length );
      let cell = row[randomColumn];
      let img = `tiles/${Math.floor( Math.random() * 8 ) + 1}.gif`;
      let div = `
        <div class="cell" id="${cell.x}-${cell.y}" style="top: ${cell.y * 3}px; left: ${cell.x * 3}px">
          <img src="${img}">
        </div>
      `;
      let ngDiv = angular.element(div);
      $("#generative-bg").append(ngDiv);
      row = row.filter( r => r != cell );
      grid[randomRow] = row;
      if (!row.length) grid = grid.filter( g => g == row )
      iluminator(grid);
    },1);
  }
  return {
    link: ($scope,element) => {
      body = angular.element(element)[0];
      let gridX = Math.ceil(body.clientWidth / 3) + 1;
      let gridY = Math.ceil(body.clientHeight / 3) + 1;
      let grid = [];
      for (let x = 0; x < gridX; x++) {
        let row = [];
        for (let y = 0; y < gridY; y++) {
          let cell = { x: x, y: y };
          row.push(cell);
        }
        grid.push(row);
      }
      iluminator(grid);
    }
  };
}]);
