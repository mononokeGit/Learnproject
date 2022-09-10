<template>
  <div class="about">
    <el-card>
      <template #header>
      <div class="card-header">
        <span justify="center">参会情况</span>
      </div>
    </template>
    <el-table :data="uncheck.value" style="width: 100%" row-class-name="warning-row" align="center">
    <el-table-column prop="unit" label="未签到" width="180" />
    </el-table>

    <el-table :data="checked.value" style="width: 100%" row-class-name="success-row" align="center">
      <el-table-column prop="unit" label="已签到" width="180" />
  </el-table>
    </el-card>
  </div>
</template>

<script  setup>
  import { ref,reactive } from 'vue';
  import { ElMessageBox } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import axios from 'axios'
  
  const checked = reactive([])
  const uncheck = reactive([])

  axios.get('/api/meetings?pagination[pageSize]=40&filters[u_boor][$eq]=true').then(res=>{
    console.log("已签到：",res.data.data)
    checked.value= res.data.data.map(item=>({
      date:item.attributes.u_time,
      unit:item.attributes.u_name}))
      console.log("检验签到：",checked)
  })

  axios.get('/api/meetings?pagination[pageSize]=40&filters[u_boor][$eq]=false').then(res=>{
    console.log("未签到：",res.data.data)
    uncheck.value = res.data.data.map(item=>({
      unit:item.attributes.u_name}))
      console.log("检验未签到：",checked)
  })
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}


.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
