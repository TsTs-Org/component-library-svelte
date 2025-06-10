<script lang="ts">
	import { LoginAndRegister } from "$lib/index.js";

</script>


<div class="mock-block">
    <LoginAndRegister
        onsubmit={async (data: object) => {
            console.log(data);
            return new Promise<{ success: boolean; msg: string }>((resolve) => {
                setTimeout(() => {
                    resolve({ success: false, msg: "mock error message" });
                }, 2000);
            });
        }}
        service="MockService"
        loginHeader="Login"
        loginDescription="Login to your account"
        registerHeader="Register"
        registerDescription="Create a new account"
    />
</div>