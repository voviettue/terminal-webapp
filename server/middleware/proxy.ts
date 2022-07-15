import { IncomingMessage, ServerResponse } from 'http'
import httpProxy from 'http-proxy'

const config = useRuntimeConfig()

const proxy = httpProxy.createProxyServer({
	target: config.public.api.baseUrl,
	changeOrigin: true,
	ws: true,
})

export default function (req: IncomingMessage, res: ServerResponse, next) {
	const prefix = '/api'
	if (req.url.startsWith(prefix)) {
		req.url = req.url.replace(prefix, config.public.api.baseUrl)
		proxy.web(req, res)
	} else {
		next()
	}
}
