import React from 'react';
import {fabric} from 'fabric';
import {Link} from 'react-router-dom'
import {appendUserWithAvatar, getUser} from '../../apiClient.js'


class FabricCanvas extends React.Component{

    componentDidMount(){
        // Make a New Canvas
        this.the_canvas = new fabric.StaticCanvas('main-canvas', {
            preserveObjectStacking: true,
            height:375,
            width:375,
        })
    }

    componentWillReceiveProps = (newprops) =>{
        if(newprops.activeProperty !== this.props.activeProperty){
            this.updateCanvasforImage(this.props.activeProperty,newprops.activeProperty);
        }
    }

    updateCanvasforImage = (prev,next) => {
        if(next){
            let to_remove
            // Find the same kind of element
            this.the_canvas.forEachObject( (object) => {

                if(object.the_type === next.the_type){
                    to_remove = object
                }
            } )
            this.the_canvas.remove(to_remove)
            this.the_canvas.add(next)
            this.the_canvas.moveTo(next, next.zIndex)
        }
    }

    saveToCanvas = () => {

        let link = document.createElement("a")
        link.href = this.the_canvas.toDataURL({format: 'png'})
        link.download = "avatar.png";
        link.click()
    }

    saveToProfile = () => {
      let saveLink = this.the_canvas.toDataURL({format: 'png'})
      let id = this.props.activeUser
      console.log(saveLink)
      getUser(id)
      .then(user => {
        user.saved_avatar = saveLink
        appendUserWithAvatar(id, user)
      })
      .catch((err) => {
        console.log(err)
      })
        //display button here to redirect back to profile page

    }

    render(){

        return (
            <div className= "main-canvas-container">
                <canvas style={{border: '3px solid black'}} id= 'main-canvas'>
                </canvas>
                <button style={{marginTop: '25vw', marginLeft: '5vw'}} className="is-rounded button is-medium is-pulled-left is-outlined" onClick = {this.saveToProfile}>
                    Save Avatar
                </button>
                <button style={{marginTop: '25vw', marginRight: '5vw'}} className="is-rounded button is-medium is-outlined" onClick = {this.saveToCanvas}>
                    Download Avatar
                </button>
                  <Link to={`/user/${this.props.activeUser}`}>Back To Profile Page</Link>
            </div>
        )
    }
}

export default FabricCanvas
