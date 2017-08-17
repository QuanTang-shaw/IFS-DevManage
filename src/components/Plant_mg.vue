<template>
  <div class="plantManagement">
    <!-- <plant-edit v-if='showPlantEdit' @submit="plantEditSub" :editPlant="editPlant" :isAddPlant="isAddPlant"> </plant-edit> -->
    <Modal
        v-model="modal1"
        title="删除工厂"
        @on-ok="ok"
        @on-cancel="cancel">
        <Alert type="warning" show-icon>
          <template slot="desc">
            删除工厂后,工厂所属的车间、机台、设备等信息都将删除
          </template>
          您确定要删除<span class="warmTitle" style="color:#FA0E0E;font-weight: bolder;">{{deletePopContent}}</span>吗?
        </Alert>
    </Modal>
    <Modal
        v-model="modal2"
        title="工厂编辑"
        @on-cancel="cancel"
        :footer-hide="true">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Form-item label="名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入工厂名称"></Input>
                </Form-item>
                <Form-item label="地址" prop="mail">
                    <Input v-model="formValidate.address" placeholder="请输入工厂地址"></Input>
                </Form-item>
                <Form-item label="工厂描述" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </Form-item>
                <Form-item label="图片" >
                  <div class="fileUpload">
                    <img src="../assets/plant1.jpg" alt="图片" @click="upPic">
                    <input type="file" style="display:none;">
                  </div>
                </Form-item>
                <Form-item>
                    <Button type="ghost" @click="close" >取消</Button>
                    <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提交</Button>
                    <Button type="primary" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </Form-item>
        </Form>
    </Modal>
    <div>
      <Button-group class=" plantManagement-toggle">
          <Button type="primary">厂区列表</Button>
          <Button>厂区地图</Button>
      </Button-group>
      <Button class="addPlant" type="primary" icon="plus-round" @click="plantEdit(null,null,true)">添加工厂</Button>
    </div>
    <div class="plant-list">
      <ul class="list-group">
        <li class="list-group-item" v-for="(plant,index) in plantList">
          <div class="row">
            <div class="col-md-2 plant-pic">
              <img src="../pic/plant1.jpg" alt="厂区图片">
            </div>
            <div class="col-md-6 plant-info">
              <p><b>名称:</b> &nbsp {{plant.strFactoryName}}</p>
              <p><b>地址:</b> &nbsp {{plant.strFactoryAddress}}</p>
              <!-- <p><b>联系方式:</b></p> -->
            </div>
            <div class="col-md-4 plant-oper" >
              <!-- <a href="#" class="btn btn-default"><i class="fa fa-pencil fa-sm"></i> Edit</a>
              <a class="btn btn-default" href="#">
                <i class="fa fa-trash-o fa-lg"></i> Delete</a>
              <a class="btn btn-default" href="#">
                <i class="fa fa-cog fa-lg"></i> Settings</a> -->
                <!-- <span class="font-icon-btn" @click="plantEdit(index)">
                  <i class="fa fa-edit fa-lg" title="编辑"></i>
                </span> -->
                <Button  icon="edit" @click="plantEdit(plant,index)">编辑</Button>
                <Button  icon="trash-a" @click="plantDelete(plant)">删除</Button>
                <!-- <span class="font-icon-btn" @click="plantDelete(plant)">
                  <i class="fa fa-trash-o fa-lg" title="删除"></i>
                </span> -->
                <!-- <span class="font-icon-btn" title="查看详情">
                  <i class="fa fa-list-alt fa-lg"></i>
                </span> -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import plantEdit from '@/modalEdit/PlantEdit'
  import {FactoryListActive,FactoryInactive,FactoryUpdate,FactoryAdd} from '@/api/getData'
  export default {
    name: 'plantList',
    data () {
      return {
        plantList:[],
        deletePopContent:'',
        editPlant:{},
        showPlantEdit:false,
        showDeletePop:false,
        isAddPlant:false,
        DelFactoryID:null,
        modal1: false,
        modal2: false,
        formValidate: {
          name: '',
          address: '',
          desc: ''
        },
        ruleValidate: {
            name: [
                { required: true, message: '名称不能为空', trigger: 'blur' }
            ],
            address: [
                { required: true, message: '地址不能为空', trigger: 'blur' },
                // { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
            ],
            city: [
                { required: true, message: '请选择城市', trigger: 'change' }
            ],
            gender: [
                { required: true, message: '请选择性别', trigger: 'change' }
            ],
            interest: [
                { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
            ],
            date: [
                { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
            ],
            time: [
                { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
            ],
            desc: [
                // { required: true, message: '请输入工厂详细信息', trigger: 'blur' },
                { type: 'string', min: 5, message: '介绍不能少于20字', trigger: 'blur' }
            ]
        }
      }
    },
    components:{
      'plant-edit':plantEdit
    },
    methods:{
      handleSubmit (name) {
        let self=this;
        this.$refs[name].validate(async function(valid){
            self.$Message.success('提交成功!');
            if (valid) {
                if(self.isAddPlant){
                  await FactoryAdd({
                    uParkUUID        :  1,  //从属园区编码
                    uFactoryTypeUUID :  1,
                    uFactoryAdminUUID:  1,
                    strFactoryName   : self.formValidate.name,     //工厂名称
                    strFactoryID     : self.editPlant.strFactoryID,//工厂ID
                    strFactoryAddress: self.formValidate.address,  //工厂地址
                  });
                }
                else{
                  await FactoryUpdate({
                    uFactoryUUID     : self.editPlant.uFactoryUUID,
                    uParkUUID        : self.editPlant.uParkUUID,     //从属园区编码
                    uFactoryTypeUUID : 1,
                    uFactoryAdminUUID: 1,
                    strFactoryName   : self.formValidate.name,    //工厂名称
                    strFactoryID     : self.editPlant.strFactoryID,    //工厂ID
                    strFactoryDesc   : self.formValidate.desc,
                    strFactoryNote   : "Note HK LEE 1",
                    strFactoryAddress: self.formValidate.address,
                    fFactoryLatitude :-1,
                    fFactoryLongitude:-1,
                    fFactoryAltitude :-1
                  });
                }
                self.plantList=await FactoryListActive();
                self.modal2=false;
            }
            else {
                self.$Message.error('表单验证失败!');
            }
        })
      },
      handleReset (name) {
          this.$refs[name].resetFields();
      },
      async ok (){
        let self=this;
        FactoryInactive({uFactoryUUID:this.DelFactoryID})
          .then(async function () {
            self.plantList=await FactoryListActive();
            self.$Message.info('删除成功');
          });
      },
      cancel () {
        this.$Message.info('点击了取消');
      },
      close(){
        this.modal2=false;
        this.$Message.info('点击了取消');
      },
      upPic(){
        event.target.nextSibling.nextSibling.click();
      },
      plantEdit(obj,index,addplant) {
        if (addplant){
          // alert('tianjia');
          this.isAddPlant=true;
          this.editPlant={
            strFactoryName:'',
            strFactoryID:'',
            strFactoryAddress:''
          };
        }
        else{
          // alert('编辑');
          this.isAddPlant=false;
          this.formValidate.name=obj.strFactoryName;
          this.formValidate.address=obj.strFactoryAddress;
          this.formValidate.desc=obj.strFactoryDesc;
          // console.log(obj)
          this.editPlant=obj;
        }
        // this.showPlantEdit=true;
        this.modal2=true;
      },
      async plantEditSub(str) {
        this.showPlantEdit=false;
        this.plantList=await FactoryListActive();
        if(str=='close'||str=='cancel');
        else if(str=='confirm'){
        }
      },
      plantDelete:function (obj) {
        this.modal1 = true;
        this.deletePopContent=obj.strFactoryName;
        this.DelFactoryID=obj.uFactoryUUID;
      }
    },
    async beforeCreate() {
      this.plantList=await FactoryListActive();
    }
  }
</script>
<style >
  .plantManagement{
    /*border:solid 1px;*/
    font-size:.7em;
  }
  .plantManagement-toggle{
    /*border:solid 1px;*/
    display:inline-block;
    margin:0px 15px 20px;
  }
  .addPlant{
    float: right;
    margin-right:20px;
  }
  .plantManagement-toggle span{
    display: inline-block;
    padding:15px 5;
  }
  .plant-list{
    /*font-size:15px;*/
  }
  .plant-list li .row>div{
    display: flex;
    /*border:solid 1px;*/
  }
  .plant-pic{
    display:block;
  }
  .plant-pic img{
    /*height:120px;*/
    width:100%;
    max-height:120px;
    max-width:180px;
  }
  .plant-list .list-group-item {
    margin-bottom:15px;
    padding: 0px 10px;
    /*border:solid 1px #EA0F0F;*/
  }
  .list-group-item .row{
    display:flex;
    justify-content:center;
  }
  .plant-info{
    flex-direction: column;
    justify-content:space-around;
    /*align-content: center;*/
  }
  .plant-info p{margin:0;}
  .plant-oper {
    padding: 0px;
    justify-content:space-around;
    align-items: center;
  }
  .font-icon-btn {
    cursor: pointer;
  }
  .fileUpload img{
      width:120px;
  }
  .fileUpload{
      border: dotted 1px #FAAFAF;
      border-radius:3px;
      display: inline-block;
      cursor:pointer;
  }
  .fileUpload:hover{border:dotted 1px #FB4242;}
</style>
