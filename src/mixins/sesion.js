export default {
    created() {
        //const token = JSON.parse(this.$q.localStorage.get('token'))
        const token = JSON.parse(this.$q.localStorage.getItem('token'))
        if (!token) {
            this.$router.push('/')
            this.$q.notify({
                message:
                  "Estimado Usuario NO se encuentra logueado....!!!",
                  color: "red-5",
                  textColor: "white",
                  icon: "warning",
                position: "bottom-right"
              });
        }
    }
}