<template>
    <div class="w-full">
        <div class="flex justify-center">
            <div class="w-32 h-32">
                <LogoMain />
            </div>
        </div>

        <p v-if="data.formErrorMsg != ''" class="text-red text-center text-sm font-bold">{{ data.formErrorMsg }}</p>

        <div v-if="data.showLoginForm" class="pt-5 space-y-6">
            <UIInput v-model="data.usernameOrEmail" label="Username or Email Address" placeholder="@Motorcars" />

            <UIInput label="Password" placeholder="ExamplePassword123" type="password" v-model="data.password" />


            <UIButton @click="handleLogin" liquid :disabled="isButtonDisabled">
                Login
            </UIButton>
        </div>

        <div v-else class="pt-5 space-y-6">
            <!-- <UIInput v-model="data.name" label="Name" placeholder="John Doe" /> -->

            <UIInput v-model="data.email" label="Email Address" placeholder="john@doe.com" />

            <!-- <UIInput v-model="data.username" label="Username" placeholder="@Motorcars" /> -->

            <UIInput label="Password" placeholder="ExamplePassword123" type="password" v-model="data.password" />

            <UIInput label="Confirm Password" placeholder="ExamplePassword123" type="password" v-model="data.repeatPassword" />


            <UIButton @click="handleRegister" liquid :disabled="isButtonDisabled">
                Sign Up
            </UIButton>
        </div>

        <p v-if="data.showLoginForm" @click="data.showLoginForm = false" class="text-sm font-body text-gray-600 dark:text-white text-center mt-3 block cursor-pointer">Don't have an account? Sign Up</p>
        <p v-else @click="data.showLoginForm = true" class="text-sm font-body text-gray-600 dark:text-white text-center mt-3 block cursor-pointer">Already have an account? Sign In</p>
    </div>
</template>

<script setup>
    const data = reactive({
        email: '',
        usernameOrEmail: '',
        password: '',
        repeatPassword: '',
        loading: false,
        showLoginForm: true,
        formErrorMsg: ''
    })

    // Login Handler
    async function handleLogin() {
        const { login } = useAuth()

        data.loading = true
        try {
            await login({
                usernameOrEmail: data.usernameOrEmail,
                password: data.password
            })
        } catch (error) {
            console.log(error)
        } finally {
            data.loading = false
        }
    }

    // Register Handler
    async function handleRegister() {
        const { register } = useAuth()

        data.loading = true

        if (data.password === data.repeatPassword) {
            try {
                await register({
                    email: data.email,
                    password: data.password,
                    repeatPassword: data.repeatPassword
                })
            } catch (error) {
                console.log(error)
            } finally {
                data.loading = false
            }
        } else {
            data.formErrorMsg = 'Passwords do not match.'
            data.loading = false
        }
    }

    const isButtonDisabled = computed(() => {
        if (data.showLoginForm) { 
            return (!data.usernameOrEmail || !data.password) || data.loading
        } else {
            return (!data.email || !data.password || !data.repeatPassword) || data.loading
        }
    })
</script>