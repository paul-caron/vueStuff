"use strict"

class Rectangle{
    constructor(color,...args){
        this.args=args
        this.color=color
    }
}

window.onload = function(){
    new Vue({
        el : "#app",
        data(){
            return {
                canvas : null,
                ctx : null,
                title : "Vue and Canvas",
                rectangles : [],
                selected : null,
                rectOffset : [0,0]
            }
        },
        methods : {
            draw(){
                this.ctx.clearRect(0,
                                   0,
                                   this.canvas.width,
                                   this.canvas.height
                )
                for(const rectangle of this.rectangles){
                    this.ctx.fillStyle=rectangle.color
                    this.ctx.fillRect(...rectangle.args)
                }
            },
            addRect(){
                const x = Math.random()*this.canvas.width
                const y = Math.random()*this.canvas.height
                const w = Math.random() * 
                         (this.canvas.width-x)/2
                const h = Math.random() * 
                         (this.canvas.width-y)/2
                const color = `#${
                            Math.floor(
                            Math.random()*256*256*256
                        ).toString(16)
                    }`
                this.rectangles.push(
                    new Rectangle(
                        color,
                        x,
                        y,
                        w,
                        h
                    )
                )
                this.draw()
            },
            removeRect(index){
                this.rectangles.splice(index,1)
                this.draw()
            },
            toRight(index){
                this.rectangles[index].args[0]+=10
                this.draw()
            },
            toLeft(index){
                this.rectangles[index].args[0]-=10
                this.draw()
            },
            toUp(index){
                this.rectangles[index].args[1]-=10
                this.draw()
            },
            toDown(index){
                this.rectangles[index].args[1]+=10
                this.draw()
            },
            touchStart(e){
                const x = e.touches[0].pageX-this.canvas.offsetLeft
                const y = e.touches[0].pageY-this.canvas.offsetTop
                for(const r of this.rectangles){
                    if(x>r.args[0]&&x<r.args[0]+r.args[2]){
                    if(y>r.args[1]&&y<r.args[1]+r.args[3]){
                    this.selected=r
                    this.rectOffset=[x-this.selected.args[0],y-this.selected.args[1]]}
                    }
                }
            },
            touchEnd(e){
                this.selected = null
            },
            touchMove(e){
                const x = e.touches[0].pageX-this.canvas.offsetLeft
                const y = e.touches[0].pageY-this.canvas.offsetTop
                if(this.selected){
                    this.selected.args[0]=x-this.rectOffset[0]
                    this.selected.args[1]=y-this.rectOffset[1]
                    this.draw()
                }
            }
        },
        mounted(){
            const c = document.getElementById("appCanvas")
            c.width = Math.min(innerWidth, innerHeight)
            c.height = c.width
            this.canvas = c
            this.ctx = c.getContext("2d")
        },
        filters : {
            round(value){
                return value.toFixed(2)
            }
        }
    })
}






 
