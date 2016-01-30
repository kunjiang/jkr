/*
**	2013-8-26 02:04:01
**	jkr�����ṩ�ĸ�����
**	
**	isMatch
**		�﷨��		boolean jkr.isMatch(������ʽ, �ַ���);
**		���ܣ�		����Ƿ�ƥ�䣬ƥ���Ϸ���true
**		������
**			var isTrue = jkr.isMatch(/^\d+/, '1a');
**			alert(isTrue);
**	match	
**		�﷨��		object jkr.match(������ʽ, �ַ���);
**		���ܣ�		���ַ�����ƥ�䵽�ĵ�һ���ַ�����ȡ����
**					���ض������
**						success			���ԣ���ʾ�Ƿ�ƥ��ɹ�
**						index			���ԣ�ƥ���ַ�����ԭʼ�ַ����е�λ��
**						value			���ԣ�ƥ�䵽���ַ���
**						length			���ԣ�ƥ�䵽���ַ����ĳ���
**						groups			�����������������ƥ�䵽����
**						groups.count	���ԣ�ƥ�䵽��ĸ���
**		������
**			var m = jkr.match(/^((.:).+\\)((.+)(\..+))$/, "C:\\1\\2\\3\\456.mp3");
**			alert(m.success);
**			if(m.success) {
**				alert("index = " + m.index + "\r\n"
**					+ "value = " + m.value + "\r\n"
**					+ "length = " + m.length + "\r\n"
**					+ "groups(0) = " + m.groups(0) + "\r\n"
**					+ "groups(1) = " + m.groups(1) + "      �ļ�·��\r\n"
**					+ "groups(2) = " + m.groups(2) + "      ��Ŀ¼\r\n"
**					+ "groups(3) = " + m.groups(3) + "      �ļ���\r\n"
**					+ "groups(4) = " + m.groups(4) + "      �޺�׺�ļ���\r\n"
**					+ "groups(5) = " + m.groups(5) + "      ��׺��\r\n"
**					+ "groups.count = " + m.groups.count 
**					);
**			}
**
**	matches
**		�﷨��		Array jkr.matches(������ʽ, �ַ���);
**		���ܣ�		��ѭ��ƥ���ַ���������ƥ�䵽���������������ʽ���أ������ÿһ����Ա����
**						success			���ԣ���ʾ�Ƿ�ƥ��ɹ�
**						index			���ԣ�ƥ���ַ�����ԭʼ�ַ����е�λ��
**						value			���ԣ�ƥ�䵽���ַ���
**						length			���ԣ�ƥ�䵽���ַ����ĳ���
**						groups			�����������������ƥ�䵽����
**						groups.count	���ԣ�ƥ�䵽��ĸ���
**		������
**			var mc = jkr.matches(/\d+(\d+)/, "1a23bc456");
**			for(var i in mc) {
**				var m = mc[i];
**				if(m.success) {
**					alert("index = " + m.index + "\r\n"
**						+ "value = " + m.value + "\r\n"
**						+ "length = " + m.length + "\r\n"
**						+ "groups(1) = " + m.groups(1) + "\r\n"
**						+ "groups.count = " + m.groups.count
**						);
**				}
**			}
**
**
**	replace
**		�﷨��		string jkr.replace(ԭʼ�ַ���, ������ʽ, ���ַ���);
**		���ܣ�		�÷�����ԭʼ�ַ���ʹ��������ʽ���д�������ƥ�䵽���������µ��ַ�������
**		������
**			var str = "2013��8��25��";
**			var res = jkr.replace(str, /(\d+)��(\d+)��(\d+)��/, "$1-$2-$3");
**			alert(res);
**
*/
(function(window) {
	var Regex = {
		isMatch	:	function(regex, input) {
						// ƥ��ķ���������boolean����
						if( !(regex instanceof RegExp) || typeof input !== 'string' ) /* throw {msg:"��������ȷ"}; // ����ʹ���쳣*/ return false;
						return regex.test(input);
					},
		match	:	function(regex, input) {
						// ƥ����ȡ�����������
						if( !(regex instanceof RegExp) || typeof input !== 'string' ) throw {msg:"��������ȷ"}; 
						var m = regex.exec(input); 
						// ��װһ��match����������һ��groups���ϣ���value�����Լ�index������length���Ե�
						var _m = {
										success	:	!!m, // ���û��ƥ��mΪnull
										index	:	m ? m.index : 0,
										length	:	m ? m[0].length : 0,
										value	:	m ? m[0] : null,
										groups	:	function(i) {
														if(!m) return [];
														if( i > m.length - 1 ) throw {msg:"��������������Χ"};
														return m[i];
													}
									};
						_m.groups.count = m ? m.length : 0;
						return _m;
					},
		matches	:	function(regex, input) {
						// ƥ���������ݷ���matchCollection
						if( !(regex instanceof RegExp) || typeof input !== 'string' ) throw {msg:"��������ȷ"}; 
						// ��֤֧��ȫ��ģʽ
						var r = regex.toString();
						var that = this;
						regex = this.isMatch(/g[^\/]*$/i, r) 
									? 	regex 
									: 	(function() {
											var m = that.match(/\/([^\/]+)\/(.*)/, r);
											return new RegExp(m.groups(1), m.groups(2) + "g");
										})();
						// ׼������
						var matchCollection = [];
						// ѭ��ƥ��װ�伯��
						
						do {
							var temp = this.match(regex, input);
							matchCollection[matchCollection.length] = temp;
						} while(temp.success);
						
						return matchCollection;
					},
		replace	:	function(oldStr, regex, newStr) {
						if(typeof oldStr === 'string' && typeof newStr === 'string' && regex instanceof RegExp) {
							return oldStr.replace(regex, newStr);
						} else {
							throw {msg : "������Ϣ����"};
						}
					}
	};
	window.jkr = Regex;
})(window);