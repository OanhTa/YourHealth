import { connect } from 'react-redux';
import React, { Component } from 'react';
import './ManagerSchedule.scss';
import _ from 'lodash';
import MarkdownIt from 'markdown-it/dist/markdown-it.js';
import MdEditor from 'react-markdown-editor-lite';
import Select from 'react-select'
// import style manually;
import 'react-markdown-editor-lite/lib/index.css';

import * as actions from '../../../store/actions'
import { CRUD_ACTION, LANGUAGES } from '../../../utils';
import { getInfoDetailDoctorServie } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class ManagerDoctorInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to Mardown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption:'',//selectedDoctor
            description: '',
            allDoctor: [],
            hasOldDate: false,

            //save to doctor-detail table
            arrPrice: [],
            arrPayment: [],
            arrProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClicnic: '',
            addressClinic: '',
            note: ''
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
    buildDataInputSelectDetail= (data)=>{
        if(data && data.length>0){
            let array = []
            data.map((item, index)=>{
                let object = {}
                let babelVi = `${item.valueVi}`
                let babelEn = `${item.valueEn}`
                object.value = item.keyMap
                object.label = this.props.language === LANGUAGES.VI? babelVi : babelEn
                array.push(object)
            })
            return array
        }
    }
    componentDidMount() {
        this.props.getAllDoctors();
        this.props.getDoctorDetailStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.allDoctor !== this.props.allDoctor){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                allDoctor: dataSelect
            })
        }
        if(prevProps.language !== this.props.language){
            let detailDoctor = this.props.allDoctorDetail || []; 

            let dataName = this.buildDataInputSelect(this.props.allDoctor)
            let dataPrice = this.buildDataInputSelectDetail(detailDoctor.resPrice)
            let dataPayment = this.buildDataInputSelectDetail(detailDoctor.resPayment)
            let dataProvince = this.buildDataInputSelectDetail(detailDoctor.resProvince)
            this.setState({
                allDoctor: dataName,
                arrPrice: dataPrice,
                arrPayment: dataPayment,
                arrProvince: dataProvince,
            })
        }
        if(prevProps.allDoctorDetail !== this.props.allDoctorDetail){
            let detailDoctor = this.props.allDoctorDetail;         
            if(detailDoctor){  
                let dataPrice = this.buildDataInputSelectDetail(detailDoctor.resPrice)
                let dataPayment = this.buildDataInputSelectDetail(detailDoctor.resPayment)
                let dataProvince = this.buildDataInputSelectDetail(detailDoctor.resProvince)

                this.setState({
                    arrPrice: dataPrice,
                    arrPayment: dataPayment,
                    arrProvince: dataProvince,
                })
            }
        }
    }
    // Finish! Markdown
    handleEditorChange =({ html, text })=> {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    handleChangeTextInfo=(e, key)=>{
        let stateCopy = {...this.state};
        stateCopy[key] = e.target.value 
        this.setState({
            ...stateCopy
        })
    }
    handleChangeSelectOption=async(selectedOption, name)=>{
        let selectedKey = name.name
        let stateCopy = {...this.state};
        stateCopy[selectedKey] = selectedOption // selectedPrice ,selectedPayment ,selectedProvince
        this.setState({
            ...stateCopy
        })
    }
    handleChange=async(selectedOption)=>{
        this.setState({
            selectedOption: selectedOption
        })
        let res = await getInfoDetailDoctorServie(selectedOption.value);
        let {arrPayment, arrPrice, arrProvince } = this.state;
        
        if(res && res.errCode == 0 && res.data && res.data.Markdown && res.data.DoctorInfo){
            let mardown = res.data.Markdown
            let doctorDetail = res.data.DoctorInfo
            this.setState({
                contentMarkdown: mardown.contentMarkdown,
                contentHTML: mardown.contentHTML,
                description: mardown.description,
                selectedPrice: arrPrice.find(item=>item.value === doctorDetail.priceId),
                selectedPayment: arrPayment.find(item=>item.value === doctorDetail.paymentId),
                selectedProvince: arrProvince.find(item=>item.value === doctorDetail.provinceId),
                nameClicnic: doctorDetail.addressClinic,
                addressClinic: doctorDetail.nameClinic,
                note: doctorDetail.note,
                hasOldDate: true
            })
        }else{
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                nameClicnic: '',
                addressClinic: '',
                note: '',
                hasOldDate: false
            })
        }
    }
    handleSaveMarkdown= ()=>{
        this.props.saveInfoDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            
            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClicnic: this.state.nameClicnic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            action: this.state.hasOldDate? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE
        })
        console.log(this.state)
    }
    
    render() {

        const mdParser = new MarkdownIt(/* Markdown-it options */);

        return (
            <div className='manage-doctor-container px-5'>
                <div className='manage-title my-3 text-center title'><FormattedMessage id="system.doctor.create-info-doctor" /></div>
                <div className='more-info row'>
                    <div className='col col-4'>
                        <label><FormattedMessage id="system.doctor.select-doctor" /></label>
                        <Select 
                            options={this.state.allDoctor} 
                            value={this.state.selectedOption}
                            onChange={this.handleChange} 
                            placeholder=''
                        />
                    </div>
                    <div className='col col-8'>
                        <label><FormattedMessage id="system.doctor.intro-doctor" /></label><br/>
                        <textarea 
                            rows={4} 
                            style={{border:'solid 1px rgb(204, 204, 204)', width: '100%'}}
                            onChange={(e)=>this.handleChangeTextInfo(e, "description")} 
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>
                <div className='more-info-extra row mb-5'>
                    <div className='col col-4'>
                        <label><FormattedMessage id="system.doctor.select-price" /></label>
                        <Select 
                            name = 'selectedPrice'
                            options={this.state.arrPrice} 
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectOption} 
                            placeholder=''
                        />
                    </div>
                    <div className='col col-4'>
                        <label><FormattedMessage id="system.doctor.select-method-pay" /></label>
                        <Select 
                            name = 'selectedPayment'
                            options={this.state.arrPayment} 
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectOption} 
                            placeholder=''
                        />
                    </div>
                    <div className='col col-4'>
                        <label><FormattedMessage id="system.doctor.select-province" /></label>
                        <Select 
                            name = 'selectedProvince'
                            options={this.state.arrProvince} 
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectOption} 
                            placeholder=''
                        />
                    </div>
                    <div className='col col-4'>
                        <label><FormattedMessage id="system.doctor.name-clinic" /></label>
                        <input 
                            className='form-control'
                            onChange={(e)=>this.handleChangeTextInfo(e, "nameClicnic")} 
                            value={this.state.nameClicnic}
                        />
                    </div>
                    <div className='col col-4'>
                        <label><FormattedMessage id="system.doctor.address-clinic" /></label>
                        <input 
                            className='form-control'
                            onChange={(e)=>this.handleChangeTextInfo(e, "addressClinic")} 
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col col-4'>
                        <label><FormattedMessage id="system.doctor.node" /></label>
                        <input 
                            className='form-control'
                            onChange={(e)=>this.handleChangeTextInfo(e, "note")} 
                            value={this.state.note}
                        />
                    </div>
                </div>
                <MdEditor 
                    style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={this.handleEditorChange} 
                    value={this.state.contentMarkdown}
                />
                <button 
                     className={this.state.hasOldDate === true ? 'save-content btn btn-info my-4':'create-content btn btn-primary my-4'}
                     onClick={this.handleSaveMarkdown}>
                     {this.state.hasOldDate === true ?
                      <FormattedMessage id="system.doctor.save" /> : <FormattedMessage id="system.doctor.add" />}
                </button>
            </div>
        );

    }
}


const mapStateToProps = state => {
    return {
        allDoctor: state.admin.allDoctor,
        language: state.app.language,
        allDoctorDetail: state.admin.doctorDetail
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoctorDetailStart: () => dispatch(actions.fetchDoctorDetailStart()),

        getAllDoctors: () => dispatch(actions.fetchAllDoctor()),
        saveInfoDoctor: (data)=> dispatch(actions.fetchSaveInfoDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDoctorInfo);