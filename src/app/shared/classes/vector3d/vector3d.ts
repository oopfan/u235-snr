import { Matrix3D } from '../matrix3d/matrix3d';

export class Vector3D {
  _elem: number[] = [0, 1, 1, 1];

  constructor () {}

  getElement(row: number): number {
    return this._elem[row];
  }

  setElement(row: number, value: number) {
    this._elem[row] = value;
  }

  setPolar(phi: number, theta: number, radius: number): Vector3D {
    const rxy = radius * Math.cos(theta);
    this._elem[1] = rxy * Math.cos(phi);
    this._elem[2] = rxy * Math.sin(phi);
    this._elem[3] = radius * Math.sin(theta);
    return this;
  }

  getPolar(): number[] {
    const radius = this._getRadius();
    const phi = Math.atan2(this._elem[2], this._elem[1]);
    const theta = Math.asin(this._elem[3] / radius);
    return [phi, theta, radius];
  }

  getRadius(): number {
    return this._getRadius();
  }

  _getRadius(): number {
    return Math.sqrt(this._dotProduct(this));
  }

  dotProduct(vec: Vector3D): number {
    return this._dotProduct(vec);
  }

  _dotProduct(vec: Vector3D): number {
    return (
      this._elem[1] * vec._elem[1] +
      this._elem[2] * vec._elem[2] +
      this._elem[3] * vec._elem[3]
    );
  }

  getAngularSeparation(vec: Vector3D): number {
    return Math.acos(Math.max(-1, Math.min(1, this._dotProduct(vec) /
      (this._getRadius() * vec._getRadius()))));
  }

  add(rhs: Vector3D): Vector3D {
    this._elem[1] += rhs._elem[1];
    this._elem[2] += rhs._elem[2];
    this._elem[3] += rhs._elem[3];
    return this;
  }

  subtract(rhs: Vector3D): Vector3D {
    this._elem[1] -= rhs._elem[1];
    this._elem[2] -= rhs._elem[2];
    this._elem[3] -= rhs._elem[3];
    return this;
  }

  scalarMultiply(scalar: number): Vector3D {
    this._elem[1] *= scalar;
    this._elem[2] *= scalar;
    this._elem[3] *= scalar;
    return this;
  }

  crossProduct(rhs: Vector3D): Vector3D {
    var x = this._elem[2] * rhs._elem[3] - this._elem[3] * rhs._elem[2];
    var y = this._elem[3] * rhs._elem[1] - this._elem[1] * rhs._elem[3];
    var z = this._elem[1] * rhs._elem[2] - this._elem[2] * rhs._elem[1];
    this._elem[1] = x;
    this._elem[2] = y;
    this._elem[3] = z;
    return this;
  }

  matrixMultiply(mat: Matrix3D): Vector3D {
    var x =
      mat._elem[1][1] * this._elem[1] +
      mat._elem[1][2] * this._elem[2] +
      mat._elem[1][3] * this._elem[3];
    var y =
      mat._elem[2][1] * this._elem[1] +
      mat._elem[2][2] * this._elem[2] +
      mat._elem[2][3] * this._elem[3];
    var z =
      mat._elem[3][1] * this._elem[1] +
      mat._elem[3][2] * this._elem[2] +
      mat._elem[3][3] * this._elem[3];
    this._elem[1] = x;
    this._elem[2] = y;
    this._elem[3] = z;
    return this;
  }
}
