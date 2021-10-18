<template>
    <el-container class="container">
        <!-- <el-page-header @back="goBack" content="搜索">
        </el-page-header> -->
        <el-header class="header">
            <el-input
                placeholder="Search here"
                v-model="input"
                class="input">
                <el-button slot="append" icon="el-icon-search"
                @click="onSearch"></el-button>
            </el-input>
        </el-header>
        <el-main class="main-container">
            <h3>Result</h3>
            <h1 v-if="listData.length === 0" class="null">No result</h1>
            <product-list :list-data="listData" v-else></product-list>
        </el-main>
    </el-container>
</template>

<script>
    import {search} from "~/api/products";
    export default {
        name: "search",
        components: {
            productList: () => import('../../components/productList')
        },
        data() {
          return {
              input: '',
              listData: [],
          }
        },
        methods: {
          onSearch() {
              if(this.input !== '') {
                  search(this.input).then( res => {
                      if(res.data.success) {
                          this.listData = res.data.products
                      }
                  } ).catch( err => {
                      this.$message.error(err)
                  })
              } else {
                  this.listData = []
              }

          },
            // goBack() {
            //   this.$router.go(-1)
            // }
        },
    }
</script>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
        padding-top: 15px;
        display: flex;
        flex-direction: column;
    }
    .header {
        width: 50%;
        align-self: center;
        margin-top: 30px;
    }
    .main-container {
        width: 100%;
    }
    .null {
        color: #919191;
    }
</style>