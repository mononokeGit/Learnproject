<template>
  <main>
    <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>会议主题</span>
        <el-button class="button" text>全区教育工作会议</el-button>
      </div>
    </template> 
    <el-row>
      <div>会议时间：2022年9月7日</div>
    </el-row>
    <el-row>
      <div>会议地点：一楼大会议厅</div>
    </el-row>
    <el-row>
      <div>会议信息：2022年教师节大会</div>
    </el-row>
    <el-row>
      <div>注意事项：请与会人员规范着装，从一楼大厅西侧进入会场，提前 20 分钟到指定位置就座,请勿自带水杯。</div>
    </el-row>
    <el-row justify="center">    
      <el-select v-model="value"  placeholder="参会单位">
    <el-option 
      v-for="item in options2.value"
      :key="item.value"
      :label="item.label"
      :value="item.label"
      :disabled="item.disabled"
    ><span>{{item.label}}</span></el-option>
  </el-select></el-row>
     <el-row justify="center"><el-button type="primary" @click="dialogVisible = true">确认签到</el-button>
    </el-row>
    <el-row class="text1" justify="center">签到完毕后，请将您的手机调到静音或震动,谢谢</el-row>
  </el-card>
  </main>

  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="80%"
    :before-close="handleClose"
  >
    <span>您的签到单位是：{{value}}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="comit(value)"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>


<script setup>
  import { ref,reactive } from 'vue';
  import { ElMessageBox } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import axios from 'axios'
  axios.defaults.timeout = 15000;
  
  const value = ref('')
  const dialogVisible = ref(false)
  const options2 = reactive([]);
  const uid=ref('')
  const c_id=ref();

  const getdata=()=>{
    axios.get('/api/meetings?pagination[pageSize]=40').then(res=>{
      console.log(res.data.data)
      options2.value=res.data.data.map(item=>(
        {
          value:item.id,
          label:item.attributes.u_name,
          disabled:item.attributes.u_boor}))
      console.log(options2)
  });
  }
  
  getdata()
  
  const comit=(value)=>{
    options2.value.forEach((item,index)=>{
      if(value == item.label){
        console.log(item.value)
        c_id.value = item.value
        axios.put('/api/meetings/'+c_id.value,{
          "data": {
            "u_boor":true,
        }
        }).then(res=>{
          console.log(res)
          ElMessage({message: '签到成功！',type: 'success',})
        })
        dialogVisible.value = false;
      }
    })
    
  }

  



  const handleClose = (done) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
  }
  </script>
  

<style>
  .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}
.text1 {
  font-size: 10px;
  text-align:'center'
}

.item {
  margin-bottom: 10px;
}

.box-card {
  width: auto;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>