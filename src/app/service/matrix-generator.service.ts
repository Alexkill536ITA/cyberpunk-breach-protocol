import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatrixGeneratorService {

  private readonly symbols = ['55', '1C', '7A', 'BD', 'E9', 'FF'];

  /**
   * Returns a random value from the `symbols` array.
   *
   * @return {string} A randomly selected symbol from the `symbols` array.
   */
  private getRandomValueFromArray() {
    return this.symbols[this.getRandomInt(0, this.symbols.length)];
  }

  /**
   * Generates a random integer between the specified minimum and maximum values.
   *
   * @param {number} min - The minimum value for the random integer.
   * @param {number} max - The maximum value for the random integer.
   * @return {number} The generated random integer.
   */
  private getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

/**
 * Generates a random sub-array of a given length from an input array.
 *
 * @param {string | any[]} array - The input array.
 * @param {number} subArrayLength - The length of the sub-array to generate.
 * @return {string | any[]} - The randomly generated sub-array.
 */
  private getRandomSubArray(array: string | any[], subArrayLength: number) {
    const start = this.getRandomInt(0, array.length - subArrayLength + 1);
    return array.slice(start, start + subArrayLength);
  }

  constructor() { }

  /**
   * Generates a matrix and sequences based on the provided parameters.
   *
   * @param {number} bufferLength - The length of the sequence to generate.
   * @param {number} matrixSize - The size of the matrix to create.
   * @param {number[]} sequenceSize - The sizes of the sequences to generate.
   * @return {Object} An object containing the generated matrix and sequences.
   * The matrix is an array of arrays, where each inner array represents a row in the matrix.
   * The sequences are an array of arrays, where each inner array represents a sequence.
   */
  generate(bufferLength: number, matrixSize: number, sequenceSize: number[]) {
    const matrix = this._createMatrix(matrixSize);
    let sequences = [];

    for (let index = 0; index < sequenceSize.length; index++) {
      let sequence = Array.from({ length: bufferLength }, (v) => { return { value: this.getRandomValueFromArray(), select: false, disabled: true } });
      sequences.push(this.getRandomSubArray(sequence, sequenceSize[index]));
      this._fillCriticalPath(matrix, sequence);
    }

    this._fillMatrix(matrix);

    return { matrix: this._setToModelMatrix(matrix), sequences: this._setToModelSequences(sequences) };
  }

  /**
   * Creates a matrix of a specified size filled with null values.
   *
   * @param {any} matrixSize - The size of the matrix to create.
   * @return {any[][]} A matrix filled with null values of the specified size.
   */
  private _createMatrix(matrixSize: any) {
    return Array.from({ length: matrixSize }, (v) => Array.from({ length: matrixSize }, (v) => null));
  }

  /**
   * Fills a critical path in the matrix with the given sequence.
   *
   * @param {any[][]} matrix - The matrix to fill the critical path in.
   * @param {string | any[]} sequence - The sequence to fill in the matrix.
   */
  private _fillCriticalPath(matrix: any[][], sequence: string | any[]) {
    let currentIndex = [0, 0];
    let isHorizontal = true;
    for (let i = 0; i < sequence.length; i++) {
      currentIndex = this._getRandomEmptyCellInMatrix(matrix, currentIndex, isHorizontal);
      matrix[currentIndex[0]][currentIndex[1]] = sequence[i];
      isHorizontal = !isHorizontal;
    }
  }

  /**
   * Returns a random empty cell in the matrix based on the current index and direction.
   *
   * @param {string | any[]} matrix - The matrix to search for an empty cell.
   * @param {any[]} currentIndex - The current index to start searching from.
   * @param {boolean} isHorizontal - Whether to search horizontally or vertically.
   * @return {any[]} The index of the random empty cell in the matrix.
   */
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

  /**
   * Fills the matrix with random values and enables the first row of the matrix.
   *
   * @param {string | any[]} matrix - The matrix to be filled.
   */
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

  /**
   * Sets the model matrix by enabling the first row of items.
   *
   * @param {any[]} matrix - The matrix to be updated with the first row enabled.
   * @return {any[]} The updated matrix with the first row items enabled.
   */
  private _setToModelMatrix(matrix: any[]) {
    matrix[0].forEach((item: any) => {
      item.disabled = false;
    });
    return matrix;
  }

  /**
   * Converts an array of sequences into a model format by mapping each item to an object with a value property and a resolve property set to false.
   *
   * @param {any[]} sequences - An array of sequences to convert.
   * @return {any[]} The converted sequence model.
   */
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
