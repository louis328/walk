
function create_shader(gl, id) {
	// シェーダを格納する変数
	var shader;
	// HTMLからscriptタグへの参照を取得
	var scriptElement = document.getElementById(id);
	// scriptタグが存在しない場合は抜ける
	if (!scriptElement) { return; }
	// scriptタグのtype属性をチェック
	switch (scriptElement.type) {
		// 頂点シェーダの場合
		case 'x-shader/x-vertex':
			shader = gl.createShader(gl.VERTEX_SHADER);
			break;
		// フラグメントシェーダの場合
		case 'x-shader/x-fragment':
			shader = gl.createShader(gl.FRAGMENT_SHADER);
			break;
		default:
			return;
	}
	// 生成されたシェーダにソースを割り当てる
	gl.shaderSource(shader, scriptElement.text);
	// シェーダをコンパイルする
	gl.compileShader(shader);
	// シェーダが正しくコンパイルされたかチェック
	if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		return shader;// 成功していたらシェーダを返して終了
	} else {
		var textarea = document.getElementById('message');
		textarea.innerHTML += ("\n create_shader:error");
		alert(gl.getShaderInfoLog(shader));// 失敗していたらエラーログをアラートする
	}
}
function create_program(gl, vs, fs) {
	// プログラムオブジェクトの生成
	var program = gl.createProgram();

	// プログラムオブジェクトにシェーダを割り当てる
	gl.attachShader(program, vs);
	gl.attachShader(program, fs);

	// シェーダをリンク
	gl.linkProgram(program);

	// シェーダのリンクが正しく行なわれたかチェック
	if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
		// 成功していたらプログラムオブジェクトを有効にする
		gl.useProgram(program);
		// プログラムオブジェクトを返して終了
		return program;
	} else {
		// 失敗していたらエラーログをアラートする
		console.log("create_program:error");
		var textarea = document.getElementById('message');
		textarea.innerHTML += ("\n create_program:error");
		alert(gl.getProgramInfoLog(program));
	}
}
function create_vbo(gl, data) {
	// バッファオブジェクトの生成
	var vbo = gl.createBuffer();
	// バッファをバインドする
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
	// バッファにデータをセット
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
	// バッファのバインドを無効化
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	// 生成した VBO を返して終了
	return vbo;
}
// IBOを生成する関数
function create_ibo(gl, data) {
	// バッファオブジェクトの生成
	var ibo = gl.createBuffer();
	// バッファをバインドする
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
	// バッファにデータをセット
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
	// バッファのバインドを無効化
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	// 生成したIBOを返して終了
	return ibo;
}
// VBOをバインドし登録する関数
function set_attribute(gl, vbo, attL, attS) {
	// 引数として受け取った配列を処理する
	for (var i in vbo) {
		// バッファをバインドする
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);
		// attributeLocationを有効にする
		gl.enableVertexAttribArray(attL[i]);
		// attributeLocationを通知し登録する
		gl.vertexAttribPointer(attL[i], attS[i], gl.FLOAT, false, 0, 0);
	}
}
function checkImageSize(img) {
	var w = img.naturalWidth, h = img.naturalHeight;
	var size = Math.pow(2, Math.log(Math.max(w, h)) / Math.LN2 | 0); // largest 2^n integer that does not exceed s
	if (w !== h || w !== size) {
		var canv = document.createElement('canvas');
		canv.height = canv.width = size;
		canv.getContext('2d').drawImage(img, 0, 0, w, h, 0, 0, size, size);
		img = canv;console.log(size);
	}
	return img;
}
/*------------------------------------------------------------------------------------------*/
export class Shader {
	constructor(gl) {
		this.gl = gl;

		var v_shader = create_shader(gl, 'vs_2D');
		var f_shader = create_shader(gl, 'fs_2D');

		this.prg = create_program(gl, v_shader, f_shader);

		this.attLocation = new Array(2);
		this.attLocation[0] = gl.getAttribLocation(this.prg, 'position');
		this.attLocation[1] = gl.getAttribLocation(this.prg, 'textureCoord');

		this.attStride = new Array(2);
		this.attStride[0] = 3;
		this.attStride[1] = 2;

		this.uniLocation = new Array();
		this.uniLocation[0] = gl.getUniformLocation(this.prg, 'matrix');
		this.uniLocation[1] = gl.getUniformLocation(this.prg, 'texture');
	}
	setMatrix(matrix) {
		this.gl.uniformMatrix4fv(this.uniLocation[0], false, matrix);
	}
	getPrg() {
		return this.prg;
	}
	getLoc() {
		return this.attLocation;
	}
	getStr() {
		return this.attStride;
	}
};
