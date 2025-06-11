/*var dataArray = [20, 40, 50, 60]
var width = 500
var height = 500

var color = d3.scaleLinear()
            .domain([d3.min(dataArray), d3.max(dataArray)])
            .range(["red", "black"])

var canvas = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)

var bars = canvas.selectAll("rect")
            .data(dataArray)
            .enter()
                .append("rect")
                .attr("width", 1000)
                .attr("height", 50)
                .attr("fill", function(d) {return color(d)})
                .attr("y", function(d, i) {return i * 100})
*/



function inputOnChange() {
    let file = document.getElementById('files').files



    /*let reader = new FileReader();
    reader.onload = function (event) {
        var zip = new JSZip();
        zip.loadAsync(event.target.result).then(function (zip) {
            Object.keys(zip.files).forEach(function (filename) {
                var file = zip.files[filename]
                if (!file.dir) {
                    let readerText = new FileReader();
                    readerText.onload = function () {
                        console.log(this.result)
                    }
                    console.log(file)
                    file.async('blob').then(function (blob) {
                        readerText.readAsText(blob)
                    })
                }
            })
        }

        )
    }


    reader.readAsArrayBuffer(file)*/

    function handleFile(f){
        console.log(f)
        JSZip.loadAsync(f)                                   // 1) read the Blob
            .then(function(zip) {

                zip.forEach(function (relativePath, zipEntry) {
                    console.log(zipEntry.name)
                    if (!file.dir) {
                        let readerText = new FileReader();
                        readerText.onload = function () {
                            console.log(this.result)
                        }
                        zipEntry.async('blob').then(function(blob){
                        readerText.readAsText(blob)
                    })
                    }
                    
                })

        }, function (e) {
            
        });
    }

    
    for (var i = 0; i < file.length; i++) {
        //console.log(files[i])
        handleFile(file[i]);
        
    }

}