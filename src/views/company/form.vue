<template>
  <div class="app-container">
    <el-form :model="form" :rules="rules" ref="form" @submit.native.prevent>
      <el-form-item label="Título" prop="title">
        <el-input v-model="form.title" :disabled="loading"></el-input>
      </el-form-item>
      <el-form-item label="Certificado (.PFX)" prop="cert_file">
            <!--<el-upload
              class="cert_file"
              action="http://api.rocketzweb.local/api/company/file"
              :headers="{'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVlMTkzMzkwZTQ4NzIyZjEzNzhhYzUzZDc1OWJmZDJmYjNhNzhhZmQwZGQyZjBjNDdlNzFjMjU3MDg2ZDcyZTM0NjhhMmYzZDlkNGZmMmI5In0.eyJhdWQiOiIxIiwianRpIjoiZWUxOTMzOTBlNDg3MjJmMTM3OGFjNTNkNzU5YmZkMmZiM2E3OGFmZDBkZDJmMGM0N2U3MWMyNTcwODZkNzJlMzQ2OGEyZjNkOWQ0ZmYyYjkiLCJpYXQiOjE1NjgwNzM1NDksIm5iZiI6MTU2ODA3MzU0OSwiZXhwIjoxNTk5Njk1OTQ5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.0qBhW4Grx3t_E0cGmHhBSarMQ1yopXUUHzeymDGQXzksNtL1VB17vn-_2NEwecZJ8qke3IvSiyfIQjV1FFgOPKhU-gkoo63IqulFI3DfpdNcjnt1jdxM1q4C7yh5GDdsTtueyb5H5cF4bqqkyrD9yWLILxLPiQ7zWq4a44ffVD0jJzkUYTWtoXkSHUM91_vTroacRaOKTSNHkU_Ro1hHTRb0k58TFF03p7FJdN9zDu5FBNYazNV0OhSDHwot95FGxUxpdL7joP1n-CBHFpw1RQ1CrsPw5idPMwhEoQ6xjfygBu3fsY4E09bjCejr1VRjt8Foky76_frcn_FOztFHwxtiSza22E3wUt5o_7NSmRCHm8I5ZOUvAAxEmY8Mglc_TESqGqCu90CZI6azYBjt2UAFrUdBHw_-AnXgC6iKCNAEh5OQStr91clDOekn1mwNGnPTqtUdj2BPdY0w0AUmHecpURLa0F2qiHlMI9MFRl7Iip23FE6hauaT2EraQT4Az62NULJxh5kSyYf3E669aui3mIGpW0g0oFovw-jV_w3BvHr9AW0MzXL9vaNkfa6yNz1i7TXz12kJS8Qojl_G0fFgI8Hz9oW2DMrKpfQuP5LZxEwoD4DeCcoRAG-XjfjWcY7dx_0aU4Dd-_NSCFlEKiqBW_73Lm7FAsZmo1pu5Ow'}"
              :file-list="[
                  {
                    name: form.cert_file
                  }
                ]"
                :on-preview="handlePreview"
                :limit="1"
                :on-exceed="handleExceed"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
              >    
                <el-button size="small" type="default" :disabled="loading">Arquivo</el-button>
              </el-upload>-->
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">Click to upload</el-button>
                <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
              </el-upload>
      </el-form-item>
      <el-form-item label="Senha" prop="cert_password">
        <el-input v-model="form.cert_password" :disabled="loading"></el-input>
      </el-form-item>
      <el-form-item>
        <router-link :to="{ name: 'company' }" class="pull-left">
          <el-button size="mini">Voltar</el-button>
        </router-link>
        <el-button
          size="mini"
          :loading="loading"
          type="primary"
          class="pull-right"
          @click="onSubmit('form')"
        >Salvar</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { show, save } from "@/api/company";

export default {
  data() {
    return {
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      loading: false,
      form: {
        title: null,
        cert_password: null,
        cert_file: null
      },
      rules: {
        title: [
          {
            required: true,
            message: "Campo obrigatório"
          }
        ],
      }
    };
  },
  created() {
    if (this.$route.params.id) {
      this.loading = true;
      show(this.$route.params.id).then(response => {
        Object.keys(this.form).forEach(key => {
          this.form[key] = response.data.data[key];
        });
        this.loading = false;
      });
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          save(this.form, this.$route.params.id)
            .then(response => {
              this.$message({
                message: "Salvo com sucesso",
                type: "success",
                duration: 5 * 1000
              });
              if (!this.$route.params.id) {
                this.$refs[formName].resetFields();
              }
            })
            .finally(responde => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style scoped>
.cert_file {
  width: 100%;
  float: left;
}
</style>