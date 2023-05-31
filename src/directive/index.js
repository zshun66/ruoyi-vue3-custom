import hasRole from './modules/hasRole'
import hasPermi from './modules/hasPermi'
import copyText from './modules/copyText'

export default function installPlugins(app) {
	app.directive('hasRole', hasRole)
	app.directive('hasPermi', hasPermi)
	app.directive('copyText', copyText)
}
