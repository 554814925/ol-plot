/**
 * Created by FDD on 2017/5/22.
 * @desc 标绘曲线算法
 */
import PlotTypes from '../../Utils/PlotTypes'
import { ol } from '../../../constants'
import * as PlotUtils from '../../Utils/utils'
class Curve extends (ol.geom.LineString) {
  constructor (points, params) {
    super()
    ol.geom.LineString.call(this, [])
    this.type = PlotTypes.CURVE
    this.t = 0.3
    this.set('params', params)
    this.setPoints(points)
  }

  /**
   * 执行动作
   */
  generate () {
    if (this.getPointCount() === 2) {
      this.setCoordinates(this.points)
    } else {
      let points = PlotUtils.getCurvePoints(this.t, this.points)
      this.setCoordinates(points)
    }
  }

  /**
   * 设置地图对象
   * @param map
   */
  setMap (map) {
    if (map && map instanceof ol.Map) {
      this.map = map
    } else {
      throw new Error('传入的不是地图对象！')
    }
  }

  /**
   * 获取当前地图对象
   * @returns {ol.Map|*}
   */
  getMap () {
    return this.map
  }

  /**
   * 判断是否是Plot
   * @returns {boolean}
   */
  isPlot () {
    return true
  }

  /**
   * 设置坐标点
   * @param value
   */
  setPoints (value) {
    this.points = !value ? [] : value
    if (this.points.length >= 2) {
      this.generate()
    }
  }

  /**
   * 获取坐标点
   * @returns {Array.<T>}
   */
  getPoints () {
    return this.points.slice(0)
  }

  /**
   * 获取点数量
   * @returns {Number}
   */
  getPointCount () {
    return this.points.length
  }

  /**
   * 更新当前坐标
   * @param point
   * @param index
   */
  updatePoint (point, index) {
    if (index >= 0 && index < this.points.length) {
      this.points[index] = point
      this.generate()
    }
  }

  /**
   * 更新最后一个坐标
   * @param point
   */
  updateLastPoint (point) {
    this.updatePoint(point, this.points.length - 1)
  }

  /**
   * 结束绘制
   */
  finishDrawing () {
  }
}

export default Curve
