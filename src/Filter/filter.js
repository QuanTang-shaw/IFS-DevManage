
function toChinese (str) {
	let toStr='';
	console.log(str);
	switch (str) {
		case 'Direct':
			// statements_1
			toStr='直接式';
			break;
		case 'Separate':
			toStr='分离式';
			break;
		case 'Direct':
			toStr='直接式';
			break;
		case 'Direct':
			toStr='直接式';
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