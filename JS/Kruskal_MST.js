class Edge {
    constructor(source, dest, weight) {
        this.source = source;
        this.dest = dest;
        this.weight = weight;
    }
    toString() {
        return this.source + '--' + this.weight + '--' + this.dest;
    }
}

class DisjointSet {
    constructor() {
        this.SET = {};
    }

    Add(element) {
        this.SET[element] = -1;
    }

    FindParent(u) {
        if (this.SET[u] == -1) {
            return u;
        }
        return this.FindParent(this.SET[u]);
    }

    Union(u, v) {
        if (this.SET[u] && this.SET[v]) {
            var parentofU = this.FindParent(u);
            var parentofV = this.FindParent(v);
            if (parentofU != parentofV) {
                this.SET[parentofV] = parentofU;
            }
        }
    }
    IsConnected(u, v) {
        var up = this.FindParent(u);
        var vp = this.FindParent(v);
        return up == vp;
    }
}

class Graph {
    constructor(n) {
        this.V = new Array(n + 1);
        this.edges = [];
    }
    addEdge(u, v, w) {
        this.edges.push(new Edge(u, v, w));
    }

    getWeightOfMST() {
        var t = 0;
        var set = new DisjointSet();

        for (var i = 1; i < this.V.length; i++) {
            set.Add(i);
        }
        
        this.edges = this.edges.sort((a, b) => {
            return (a.weight > b.weight) ? 1 : (a.weight == b.weight) ? 0 : -1; 
        });

        for (let e of this.edges) {
            if (!set.IsConnected(e.source, e.dest)) {
                t += e.weight;
                set.Union(e.source, e.dest);
            }
        }
        return t;
    }
}

function kruskals(gNodes, gFrom, gTo, gWeight) {

    let g = new Graph(gNodes);

    for (var i = 0; i < gFrom.length; i++) {
        g.addEdge(gFrom[i], gTo[i], gWeight[i]);
    }
    return g.getWeightOfMST();
}

function main() {
    var sampleTestCase = `5 7
    1 2 20
    1 3 50
    1 4 70
    1 5 90
    2 3 30
    3 4 40
    4 5 60`.split('\n');
    var n = parseInt(sampleTestCase[0].split(' ')[0]);
    var es = parseInt(sampleTestCase[0].split(' ')[1]);
    var gF = [];
    var gT = [];
    var gW = [];
    for (var i = 1; i <= es; i++) {
        var vals = sampleTestCase[i].trim().split(' ');
        gF.push(parseInt(vals[0], 10));
        gT.push(parseInt(vals[1], 10));
        gW.push(parseInt(vals[2], 10));
    }
    console.log(kruskals(n, gF, gT, gW));
}

main();
