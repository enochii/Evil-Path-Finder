import { ITEM_WALL, ITEM_CLICKED } from "../constants";
import MgBase from "./mgBase";

export default class Recursion extends MgBase {
    static HOR = 'horizontal';
    static VER = 'vertical';

    constructor(args) {
        super(args);
        // 稀疏因子，让生成的格子不要太密集
        this.cnt = 0;
        this.sparseFactor_ = 1.8;
        // 方向，子类会覆盖
        // this.orientation_ = Recursion.HOR;
    }

    excute = () => {
        const {board} = this;
		console.log(this.orientation_, Recursion.VER);
        this.recursiveDivisionMaze_(board, 0, board.length, 0, board[0].length,this.orientation_,false, "wall");
    }

    recursiveDivisionMaze_(board, rowStart, rowEnd, colStart, colEnd, orientation, surroundingWalls, type) {
        // console.log('?');
        if (rowEnd < rowStart || colEnd < colStart) {
          return;
        }
        if (!surroundingWalls) {
            for(var r=0; r< board.length; r++) {
                for(var c=0; c<board[0].length; c++) {
                    if(!this.canSetWall(r, c)) continue;
                    if (r === 0 || c === 0 || r === board.length - 1 || c === board[0].length - 1) {
                        if (type === "wall") {
                            this.updateItem_(r, c, ITEM_CLICKED);
                        } else if (type === "weight") {
                            // this.updateItem_(r,c)
                        }
                      }
                }
            }
          surroundingWalls = true;
        }
        if (orientation === Recursion.HOR) {
          let possibleRows = [];
          for (let number = rowStart; number <= rowEnd; number += 2) {
            possibleRows.push(number);
          }
          let possibleCols = [];
          for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
            possibleCols.push(number);
          }
          let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        //   let randomColIndex = Math.floor(Math.random() * possibleCols.length);
          let currentRow = possibleRows[randomRowIndex];
          let colRandom = Math.floor(Math.random() * 3);
          
          for(var r = 0; r<board.length; r++) {
              for(var c=0;c<board[0].length;c++) {
                if (r === currentRow && c%3!=colRandom && c >= colStart - 1 && c <= colEnd + 1) {
                    //   let currentHTMLNode = document.getElementById(node);
                    if (this.canSetWall(r, c)) {
                        // board.wallsToAnimate.push(currentHTMLNode);
                        if (type === "wall") {
                          this.updateItem_(r,c, ITEM_CLICKED);
                        } else {
                        //   board.nodes[node].status = "unvisited";
                        //   board.nodes[node].weight = 15;
                        }        
                    }
                }
              }
          }

          if (currentRow - 2 - rowStart > colEnd - colStart) {
            this.recursiveDivisionMaze_(board, rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls, type);
          } else {
            this.recursiveDivisionMaze_(board, rowStart, currentRow - 2, colStart, colEnd, Recursion.VER, surroundingWalls, type);
          }
          if (rowEnd - (currentRow + 2) > colEnd - colStart) {
            this.recursiveDivisionMaze_(board, currentRow + 2, rowEnd, colStart, colEnd, orientation, surroundingWalls, type);
          } else {
            this.recursiveDivisionMaze_(board, currentRow + 2, rowEnd, colStart, colEnd, Recursion.VER, surroundingWalls, type);
          }
        } else if(orientation === Recursion.VER){
          let possibleCols = [];
          for (let number = colStart; number <= colEnd; number += 2) {
            possibleCols.push(number);
          }
          let possibleRows = [];
          for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
            possibleRows.push(number);
          }
          let randomColIndex = Math.floor(Math.random() * possibleCols.length);
          let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
          let currentCol = possibleCols[randomColIndex];
          let rowRandom = Math.floor(Math.random() * 3);
          
          for(var r = 0; r < board.length; r++) {
              for(var c = 0;c <board[0].length; c++) {
                if (c === currentCol && r%3!=rowRandom && r >= rowStart - 1 && r <= rowEnd + 1) {
                    if (this.canSetWall(r,c)) {
                        if (type === "wall") {
                            this.updateItem_(r, c, ITEM_CLICKED);
                        } else {
                        
                        }        
                    }
                }
              }
          }

          if (rowEnd - rowStart > currentCol - 2 - colStart) {
            var wall = (rowEnd-rowStart> board.length/this.sparseFactor_)? 'wall':'';
            this.recursiveDivisionMaze_(board, rowStart, rowEnd, colStart, currentCol - 2, Recursion.HOR, surroundingWalls, wall);
          } else {
            this.recursiveDivisionMaze_(board, rowStart, rowEnd, colStart, currentCol - 2, orientation, surroundingWalls, type);
          }
          if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
              var wall = (rowEnd-rowStart> board.length/this.sparseFactor_)? 'wall':'';
            this.recursiveDivisionMaze_(board, rowStart, rowEnd, currentCol + 2, colEnd, Recursion.HOR, surroundingWalls, wall);
          } else {
            this.recursiveDivisionMaze_(board, rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingWalls, type);
          }
        }
      };
}
  