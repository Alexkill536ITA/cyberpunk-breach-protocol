import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatrixGeneratorService {

  private readonly symbols = ['55', '1C', '7A', 'BD', 'E9', 'FF'];

  private getRandomValueFromArray() {
    return this.symbols[this.getRandomInt(0, this.symbols.length)];
  }

  private getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private getRandomSubArray(array: string | any[], subArrayLength: number) {
    const start = this.getRandomInt(0, array.length - subArrayLength + 1);
    return array.slice(start, start + subArrayLength);
  }

  constructor() { }

  generate(bufferLength: number, matrixSize: number, sequenceSize: number[]) {
    const sequence = Array.from({ length: bufferLength }, (v) => { return { value: this.getRandomValueFromArray(), select: false, disabled: true } });
    let sequences = [];

    for (let index = 0; index < sequenceSize.length; index++) {
      sequences.push(this.getRandomSubArray(sequence, sequenceSize[index]));
    }

    const matrix = this._createMatrix(matrixSize);

    this._fillCriticalPath(matrix, sequence);
    this._fillMatrix(matrix);

    return { matrix: this._setToModelMatrix(matrix), sequences: this._setToModelSequences(sequences) };
  }

  private _createMatrix(matrixSize: any) {
    return Array.from({ length: matrixSize }, (v) => Array.from({ length: matrixSize }, (v) => null));
  }

  private _fillCriticalPath(matrix: any[][], sequence: string | any[]) {
    let currentIndex = [0, 0];
    let isHorizontal = true;
    for (let i = 0; i < sequence.length; i++) {
      currentIndex = this._getRandomEmptyCellInMatrix(matrix, currentIndex, isHorizontal);
      matrix[currentIndex[0]][currentIndex[1]] = sequence[i];
      isHorizontal = !isHorizontal;
    }
  }

  private _getRandomEmptyCellInMatrix(matrix: string | any[], currentIndex: any[], isHorizontal: boolean) {
    let index = currentIndex;
    if (isHorizontal) {
      while (matrix[index[0]][index[1]] != null) {
        index = [currentIndex[0], this.getRandomInt(0, matrix.length)];
      }
    } else {
      while (matrix[index[0]][index[1]] != null) {
        index = [this.getRandomInt(0, matrix.length), currentIndex[1]];
      }
    }
    return index;
  }

  private _fillMatrix(matrix: string | any[]) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] == null) {
          matrix[i][j] = { value: this.getRandomValueFromArray(), select: false, disabled: true };
        }
      }
    }
    for (let i = 0; i < matrix.length; i++) {
      matrix[0][i].disabled = false;
    }
  }

  private _setToModelMatrix(matrix: any[]) {
    matrix[0].forEach((item: any) => {
      item.disabled = false;
    });
    return matrix;
  }

  private _setToModelSequences(sequences: any[]) {
    let sequenceModel: any[] = [];
    sequences.forEach((row: any[]) => {
      let newRow: any[] = [];
      row.forEach((item) => {
        newRow.push({ value: item.value, resolve: false });
      });
      sequenceModel.push(newRow);
    });
    return sequenceModel;
  }
}
