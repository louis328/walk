class Polygon {
    constructor(name){
        this.name = name;
        this.vertex_position = //3*4
		[
			-1.0, 1.0, 0.0,
			1.0, 1.0, 0.0,
			-1.0, -1.0, 0.0,
			1.0, -1.0, 0.0
        ];
        this.vertex_index = 
		[
			0,2,1, 1,2,3
        ];
        this.textureCoord = 
		[
			0,0, 1,0, 0,1, 1,1
		];
        this.vertices = this.vertex_position.length;
        this.indices = 	this.vertex_index.length;
        var gl = g_gameData.canvas.getGL();
        this.pos_vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.pos_vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertex_position), gl.DYNAMIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        this.tex_vbo = create_vbo(gl, this.textureCoord);
        this.VBOList = [this.pos_vbo, this.tex_vbo];
        this.IBO = create_ibo(gl, this.vertex_index);

        this.canvas = canvas;
        
    }

    getIndices(){
        return this.indices;
    }
    getVBO(){
		return this.VBOList;
	}
	getIBO(){
		return this.IBO;
    }
    getName(){
        return this.name;
    }
};