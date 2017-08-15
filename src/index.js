/**
 * Created by FDD on 2017/5/15.
 * @desc 基于openlayer的动态标绘
 */
import { ol } from './Constants'
import Plots from './Geometry/index'
import PlotTypes from './Utils/PlotTypes'
class Plot {
  constructor (map) {
    this.version = '1.0.0'
    if (map && map instanceof ol.Map) {
      this.map = map
    } else {
      throw new Error('缺少地图对象！')
    }
  }

  /**
   * 创建Plot
   * @param type
   * @param points
   * @param _params
   * @returns {*}
   */
  createPlot (type, points, _params) {
    let params = _params || {}
    switch (type) {
      case PlotTypes.POINT:
        return new Plots.Point(points, params)
      case PlotTypes.PENNANT:
        return new Plots.Pennant(points, params)
      case PlotTypes.POLYLINE:
        return new Plots.Polyline(points, params)
      case PlotTypes.ARC:
        return new Plots.Arc(points, params)
      case PlotTypes.CIRCLE:
        return new Plots.Circle(points, params)
      case PlotTypes.CURVE:
        return new Plots.Curve(points, params)
      case PlotTypes.FREE_LINE:
        return new Plots.FreeHandLine(points, params)
      case PlotTypes.RECTANGLE:
        return new Plots.RectAngle(points, params)
      case PlotTypes.ELLIPSE:
        return new Plots.Ellipse(points, params)
      case PlotTypes.LUNE:
        return new Plots.Lune(points, params)
      case PlotTypes.SECTOR:
        return new Plots.Sector(points, params)
      case PlotTypes.CLOSED_CURVE:
        return new Plots.ClosedCurve(points, params)
      case PlotTypes.POLYGON:
        return new Plots.Polygon(points, params)
      case PlotTypes.ATTACK_ARROW:
        return new Plots.AttackArrow(points, params)
      case PlotTypes.FREE_POLYGON:
        return new Plots.FreePolygon(points, params)
      case PlotTypes.DOUBLE_ARROW:
        return new Plots.DoubleArrow(points, params)
      case PlotTypes.STRAIGHT_ARROW:
        return new Plots.StraightArrow(points, params)
      case PlotTypes.FINE_ARROW:
        return new Plots.FineArrow(points, params)
      case PlotTypes.ASSAULT_DIRECTION:
        return new Plots.AssaultDirection(points, params)
      case PlotTypes.TAILED_ATTACK_ARROW:
        return new Plots.TailedAttackArrow(points, params)
      case PlotTypes.SQUAD_COMBAT:
        return new Plots.SquadCombat(points, params)
      case PlotTypes.TAILED_SQUAD_COMBAT:
        return new Plots.TailedSquadCombat(points, params)
      case PlotTypes.GATHERING_PLACE:
        return new Plots.GatheringPlace(points, params)
    }
    return null
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

  generate () {}
}
export default Plot
