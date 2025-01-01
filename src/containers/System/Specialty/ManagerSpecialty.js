
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it/dist/markdown-it.js';
import MdEditor from 'react-markdown-editor-lite';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { CommonUtils } from '../../../utils';
import { createNewSpecialty } from '../../../services/userService';

class ManagerSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameSpe : "",
            imageBase64 : "",
            contentMarkdown: '',
            contentHTML: '',
        }
    }

    async componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
       
    }
     // Finish! Markdown
     handleEditorChange =({ html, text })=> {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }
    handleOnChangeName = async (event) => {
        this.setState({
            nameSpe: event.target.value
        })
    }
    handleSavesSpecialty = async()=>{
        let res = await createNewSpecialty(this.state)
        if(res && res.errCode === 0){
            toast.success("Tạo mới thành công")
        }else{
            toast.error("Lỗi chưa tạo được chuyên khoa")
        }
    }
    render() {
        const mdParser = new MarkdownIt(/* Markdown-it options */);
        console.log(this.state)
        return (
            <div>
                <div className='title'>
                    QUẢN LÝ CHUYÊN KHOA
                </div>
                <div className='mx-3'>
                    <div className='my-3'>
                        <div className="row">
                            <div className="form-group col-6">
                                <label >Tên chuyên khoa</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={this.state.nameSpe}
                                    onChange={(e)=>this.handleOnChangeName(e)}
                                    name="nameSpe"></input>
                            </div>
                            <div className="form-group col-6">
                                <label >Chọn ảnh chuyên khoa</label><br/>
                                <div class="custom-file">
                                    <input 
                                        type="file" 
                                        class="custom-file-input" id="1" 
                                        onChange={(e)=>this.handleOnChangeImage(e)}
                                    />
                                    <label class="custom-file-label" for="1">Choose file</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <MdEditor 
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value={this.state.contentMarkdown}
                    />
                    <button 
                        className='save-content btn btn-info my-4'
                        onClick={this.handleSavesSpecialty}>
                        <FormattedMessage id="system.doctor.save" />
                    </button>
             </div>
        </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerSpecialty);
