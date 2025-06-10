<script lang="ts">
	import { SimpleLogin } from "$lib/index.js";

</script>

<div class="mock-block">
    <SimpleLogin
        onsubmit={async (data: object) => {
            console.log(data);
            return new Promise<{ success: boolean; msg: string }>((resolve) => {
                setTimeout(() => {
                    resolve({ success: false, msg: "mock error message" });
                }, 2000);
            });
        }}
        service="MockService"
        header="Welcome back"
        description="Login to your account"
        timeout={10000}
    />
</div>