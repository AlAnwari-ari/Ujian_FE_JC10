import React, {Component} from 'react'
import './Register.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Register extends Component {
    render() {
        return(
            <div className="body row">
                <div className="col-5">
                    <div className="over"></div>
                    <img className="gambar" src="https://cdn.yukepo.com/content-images/main-images/2018/01/27/main_image_15159.jpg" alt="gambar"/>

                </div>
                <div className="regbox col-7 pr-4 mt-3">
                    <Form>
                        <div className="row">
                            <div className="col-12">
                                <h1 className="text-center">Join Us!</h1>
                                <p className="ajak text-center">Apakah barang mantan masih menghantui hidupmu?</p>
                                <p className="ajak text-center" style={{lineHeight:'0', marginBottom:'30px'}}>Let's Move On! Jual barang mantanmu supaya lebih bermanfaat untuk orang lain.</p>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input type="email" name="email" id="email" placeholder="Type your Email" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" placeholder="Type your Password" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="kelamin">Jenis Kelamin</Label>
                                    <Input type="select" name="select" id="kelamin">
                                        <option>Laki-Laki</option>
                                        <option>Perempuan</option>
                                        <option>Lainnya</option>
                                    </Input>
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <FormGroup>
                                    <Label for="status">Status</Label>
                                    <Input type="select" name="select" id="status">
                                        <option>Jomblo</option>
                                        <option>Pacaran</option>
                                        <option>Menikah</option>
                                        <option>Janda/Duda</option>
                                        <option>Keberatan untuk menampilkannya</option>
                                    </Input>
                                </FormGroup>
                            </div>
                            <div className="col-6">
                                <FormGroup>
                                    <Label for="mantan">Jumlah Mantan</Label>
                                    <Input type="select" name="select" id="mantan">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>> 5</option>
                                    </Input>
                                </FormGroup>
                            </div>
                        </div>
                        <Button className="btnsub">SUBMIT</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Register;