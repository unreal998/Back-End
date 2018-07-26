const config = {
	production:{
		SECRET: process.env.SECRET,
		DATABASE: 'mongodb://unreal:123654zx@ds119368.mlab.com:19368/tutorial'
	},
	default:{
		SECRET: 'SUPERSECRETPASS',
		DATABASE: 'mongodb://unreal:123654zx@ds119368.mlab.com:19368/tutorial'
  }
  // mongodb://team_task:team_task111@ds145193.mlab.com:45193/escarpe 
}

exports.get = function get(env){
	return config[env] || config.default;
}