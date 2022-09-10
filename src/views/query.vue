<template>
  查询序号：{{isid}}-反馈条目：{{one}}、{{two}}
  <div>
      加载状态：{{loading}}------数据：{{result}}
  </div>
</template>

<script setup>
import { useQuery } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';
import { ref } from 'vue';

const isid = ref(3)
const one = ref('u_boor')
const two = ref('m_num')

const {result,loading} = useQuery(gql`
{
meeting(id: "${isid.value}") {
  data {
    id
    attributes{
      ${one.value}
      u_type
      u_name
      ${two.value}
    }
  }
}
}
`)
</script>