# John Conway's Game of Life
A lightweight, javascript only, execution of John Conway's Game of Life. 
Full discription of the Game of Life can be viewed [here](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

## Rules
1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## Deployment
Being only HTML, JS, and CSS, the Game of Life is easy to deploy. 
Simply open the index.html file in any browser. The game will run itself from there.

## Utilizing 
The game give you a few options to manipulate the game the way you like. These include
1. **Play/Stop** - Continue running the game or stop it. Depending on the game state.
2. **Advance** - Iterates to the next game state without playing through all the iterations. (Best used when the game is stopped)
3. **New** - Completely clears the board and randomly assigns new cells to the board.
4. **Clear** - Clears the current board state to be completely blank.
5. **Set Size** - Depending on input of the board height and size, the gameboard will reset to match.
6. **Clicking the Board** - If you want to add your own cells or create a board on your own, click on empty cells on the board, or click live cells to make them unactive.
