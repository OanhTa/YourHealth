import { connect } from 'react-redux';
import React, { Component } from 'react';
import './UserManage.scss';
import _ from 'lodash';
import MarkdownIt from 'markdown-it/dist/markdown-it.js';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select'
// import style manually;
import 'react-markdown-editor-lite/lib/index.css';

import * as actions from '../../store/actions'
import { LANGUAGES } from '../../utils';

class ManagerDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption:'',
            description: '',
            allDoctor: []
        }
    }
    buildDataInputSelect= (data)=>{
        if(data && data.length>0){
            let array = []
            data.map((item, index)=>{
                let object = {}
                let babelVi = `${item.firstName} ${item.lastName}`
                let babelEn = `${item.lastName} ${item.firstName}`
                object.value = item.id
                object.label = this.props.language === LANGUAGES.VI? babelVi : babelEn
                array.push(object)
            })
            return array
        }
    }
    componentDidMount() {
        this.props.getAllDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.allDoctor !== this.props.allDoctor){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                allDoctor: dataSelect
            })
        }
        if(prevProps.language !== this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                allDoctor: dataSelect
            })
        }
    }
    // Finish!
    handleEditorChange =({ html, text })=> {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    handleTextInfoChange=(e)=>{
        this.setState({
            description: e.target.value
        })
    }
    handleChange=(selectedOption)=>{
        this.setState({
            selectedOption
        })
    }
    handleSaveMarkdown= ()=>{
        this.props.saveInfoDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption,
        })
    }
    
    render() {
        console.log(this.state.allDoctor);
        const mdParser = new MarkdownIt(/* Markdown-it options */);

        return (
            <div className='manage-doctor-container px-5'>
                <div className='manage-title my-3 text-center title'>QUẢN LÝ THÔNG TIN BÁC SĨ</div>
                <div className='more-info row mb-5'>
                    <div className='col col-4'>
                        <label>Chọn bác sĩ</label>
                        <Select 
                            options={this.state.allDoctor} 
                            value={this.state.selectedOption}
                            onChange={this.handleChange} 
                        />
                    </div>
                    <div className='col col-8'>
                        <label>Thông tin giới thiệu</label><br/>
                        <textarea 
                            rows={4} cols={120} 
                            style={{border:'solid 1px rgb(204, 204, 204)'}}
                            onChange={(e)=>this.handleTextInfoChange(e)} 
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>
                <MdEditor 
                    style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={this.handleEditorChange} 
                />
                <button 
                     className='save-content btn btn-primary px-2 my-3 rounded'
                     onClick={this.handleSaveMarkdown}>
                    Lưa văn bản</button>
            </div>
        );

    }
}


const mapStateToProps = state => {
    return {
        allDoctor: state.admin.allDoctor,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.fetchAllDoctor()),
        saveInfoDoctor: (data)=> dispatch(actions.fetchSaveInfoDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDoctor);