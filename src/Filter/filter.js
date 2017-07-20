
function toChinese (str) {
	let toStr='';
	// console.log(str);
	switch (str) {
		case 'feeder':
			// statements_1
			toStr='送料机';
			break;
		case 'mtm':
			// statements_1
			toStr='模温机';
			break;
		case 'dryer':
			// statements_1
			toStr='干燥机';
			break;
		case 'Manipulator':
			// statements_1
			toStr='机械手';
			break;
		case 'Measuringmachine':
			// statements_1
			toStr='计量设备';
			break;
		case 'CrushingRecycling':
			// statements_1
			toStr='粉碎回收设备';
			break;


		case 'Direct':
			// statements_1
			toStr='直接式';
			break;
		case 'Separate':
			toStr='分离式';
			break;
		case 'OpenSeparation':
			toStr='开放式';
			break;
		case 'cups':
			toStr='料杯';
			break;
		case 'waterType':
			toStr='水式模温机';
			break;
		case 'oilType':
			toStr='油式模温机';
			break;
		case 'rcsh':
			toStr='速冷速热模温机';
			break;
		case 'dmtm':
			toStr='双温模温机';
			break;
		case 'Ordinary':
			toStr='普通型干燥机';
			break;
		case 'thd':
			toStr='不锈钢型干燥机';
			break;
		case 'Hor_singleAxis':
			toStr='单轴横走式';
			break;
		case 'Cro_threeAxes':
			toStr='三轴横走式';
			break;
		case 'Screw':
			toStr='螺杆式色母计量机';
			break;
		case 'weight':
			toStr='重量式计量机';
			break;
		case 'Vertical':
			toStr='卧式混色机';
			break;
		case 'Hor_blending':
			toStr='立式混色机';
			break;
		case 'Slowmuffler':
			toStr='慢速静音粉碎机';
			break;
		case 'strong':
			toStr='强力型粉碎机TGP系列';
			break;
		case 'Strongmute':
			toStr='强力静音粉碎机TGP系列';
			break;
		case 'plunger':
			toStr='柱塞式注塑机';
			break;
		case 'ReScrew':
			toStr='往复螺旋式';
			break;
		case 'sppi':
			toStr='螺杆塑化柱塞注射式';
			break;
		default:
			// statements_def
			toStr='未知名的设备';
			break;
	}
	return toStr;
}
export default{
	toChinese
}