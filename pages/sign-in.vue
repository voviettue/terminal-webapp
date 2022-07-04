<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">STORE FRONT</h2>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <FormKit type="text" label="Your email"/>
          </div>
          <div>
            <FormKit type="password" label="Password"/>
          </div>
        </div>

        <div>
            <FormKit type="submit" label="Sign in" input-class="w-full"/>
        </div>

        <div class="flex justify-center">
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
