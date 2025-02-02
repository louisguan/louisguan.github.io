const { useState, useMemo } = React;

const etfData = [
{ code: "0050", name: "元大台灣50", period: "半年配", dividend: "$4.000", compared: "▼0.500", yield: "2.09%", category: "市值" },
{ code: "0051", name: "元大中型100", period: "年配", dividend: "$2.460", compared: "▼0.040", yield: "3.18%", category: "市值" },
{ code: "0052", name: "富邦科技", period: "年配", dividend: "$6.430", compared: "▲2.430", yield: "3.42%", category: "主題" },
{ code: "0053", name: "元大電子", period: "年配", dividend: "$2.000", compared: "▲0.100", yield: "1.98%", category: "主題" },
{ code: "0055", name: "元大MSCI金融", period: "年配", dividend: "$1.180", compared: "▲0.580", yield: "4.19%", category: "主題" },
{ code: "0056", name: "元大高股息", period: "季配", dividend: "$3.630", compared: "▲0.380", yield: "9.81%", category: "高股息" },
{ code: "0057", name: "富邦摩台", period: "年配", dividend: "-", compared: "-", yield: "-", category: "市值" },
{ code: "006201", name: "元大富櫃50", period: "年配", dividend: "$0.750", compared: "▲0.100", yield: "3.33%", category: "市值" },
{ code: "006203", name: "元大MSCI台灣", period: "半年配", dividend: "$2.700", compared: "▲0.570", yield: "2.99%", category: "市值" },
{ code: "006204", name: "永豐臺灣加權", period: "年配", dividend: "$0.700", compared: "▼3.259", yield: "0.61%", category: "市值" },
{ code: "006208", name: "富邦台50", period: "半年配", dividend: "$1.683", compared: "▼0.530", yield: "1.51%", category: "市值" },
{ code: "00646", name: "元大S&P500", period: "年配", dividend: "-", compared: "-", yield: "-", category: "國際" },
{ code: "00660", name: "元大歐洲50", period: "年配", dividend: "-", compared: "-", yield: "-", category: "國際" },
{ code: "00661", name: "元大日經225", period: "年配", dividend: "-", compared: "-", yield: "-", category: "國際" },
{ code: "00690", name: "兆豐藍籌30", period: "季配", dividend: "$3.450", compared: "▲0.950", yield: "10.14%", category: "市值" },
{ code: "00692", name: "富邦公司治理", period: "半年配", dividend: "$1.015", compared: "▼0.779", yield: "2.30%", category: "主題" },
{ code: "00701", name: "國泰股利精選30", period: "半年配", dividend: "$1.090", compared: "▲0.230", yield: "3.69%", category: "高股息" },
{ code: "00702", name: "國泰標普低波高息", period: "半年配", dividend: "$0.960", compared: "▲0.370", yield: "3.60%", category: "高股息" },
{ code: "00712", name: "復華富時不動產", period: "季配", dividend: "$0.785", compared: "▼0.115", yield: "7.95%", category: "主題" },
{ code: "00713", name: "元大台灣高息低波", period: "季配", dividend: "$5.280", compared: "▲2.240", yield: "9.49%", category: "高股息" },
{ code: "00714", name: "群益道瓊美國地產", period: "季配", dividend: "$0.492", compared: "▲0.010", yield: "2.17%", category: "主題" },
{ code: "00717", name: "富邦美國特別股", period: "季配", dividend: "$0.665", compared: "▲0.035", yield: "4.03%", category: "高股息" },
{ code: "00728", name: "第一金工業30", period: "年配", dividend: "$1.300", compared: "▲0.370", yield: "4.03%", category: "主題" },
{ code: "00730", name: "富邦臺灣優質高息", period: "月配", dividend: "$1.386", compared: "▲0.250", yield: "6.23%", category: "高股息" },
{ code: "00731", name: "復華富時高息低波", period: "季配", dividend: "$10.350", compared: "▲6.630", yield: "15.15%", category: "高股息" },
{ code: "00733", name: "富邦臺灣中小", period: "半年配", dividend: "$6.474", compared: "▲5.160", yield: "12.03%", category: "市值" },
{ code: "00735", name: "國泰臺韓科技", period: "半年配", dividend: "$3.830", compared: "▲2.310", yield: "11.78%", category: "國際" },
{ code: "00736", name: "國泰新興市場", period: "半年配", dividend: "$0.230", compared: "▼0.090", yield: "0.98%", category: "國際" },
{ code: "00739", name: "元大MSCIA股", period: "年配", dividend: "-", compared: "-", yield: "-", category: "國際" },
{ code: "00770", name: "國泰北美科技", period: "年配", dividend: "$4.000", compared: "▲1.200", yield: "7.91%", category: "國際" },
{ code: "00771", name: "元大US高息特別股", period: "季配", dividend: "$0.850", compared: "▲0.120", yield: "4.69%", category: "高股息" },
{ code: "00830", name: "國泰費城半導體", period: "年配", dividend: "$1.510", compared: "▲1.390", yield: "3.34%", category: "國際" },
{ code: "00850", name: "元大臺灣ESG永續", period: "季配", dividend: "$2.240", compared: "▲0.120", yield: "4.98%", category: "主題" },
{ code: "00851", name: "台新全球AI", period: "年配", dividend: "-", compared: "-", yield: "-", category: "主題" },
{ code: "00858", name: "永豐美國500大", period: "半年配", dividend: "$3.200", compared: "▲0.627", yield: "9.36%", category: "國際" },
{ code: "00878", name: "國泰永續高股息", period: "季配", dividend: "$2.010", compared: "▲0.770", yield: "9.12%", category: "高股息" },
{ code: "00881", name: "國泰台灣5G+", period: "半年配", dividend: "$1.750", compared: "▲0.940", yield: "7.17%", category: "主題" },
{ code: "00882", name: "中信中國高股息", period: "半年配", dividend: "$0.660", compared: "▼0.040", yield: "5.30%", category: "高股息" },
{ code: "00888", name: "永豐台灣ESG", period: "季配", dividend: "$0.717", compared: "▼0.115", yield: "4.37%", category: "主題" },
{ code: "00891", name: "中信關鍵半導體", period: "季配", dividend: "$1.620", compared: "▲0.890", yield: "9.32%", category: "主題" },
{ code: "00892", name: "富邦台灣半導體", period: "半年配", dividend: "$0.385", compared: "▼0.094", yield: "2.29%", category: "主題" },
{ code: "00894", name: "中信小資高價30", period: "季配", dividend: "$1.500", compared: "▲0.950", yield: "7.31%", category: "主題" },
{ code: "00896", name: "中信綠能及電動車", period: "季配", dividend: "$1.510", compared: "▲0.580", yield: "8.53%", category: "主題" },
{ code: "00900", name: "富邦特選高股息30", period: "月配", dividend: "$1.212", compared: "▲0.241", yield: "8.51%", category: "高股息" },
{ code: "00901", name: "永豐智能車供應鏈", period: "年配", dividend: "$0.900", compared: "▲0.272", yield: "4.46%", category: "主題" },
{ code: "00903", name: "富邦元宇宙", period: "季配", dividend: "-", compared: "-", yield: "-", category: "主題" },
{ code: "00904", name: "新光臺灣半導體30", period: "季配", dividend: "$0.650", compared: "▲0.210", yield: "3.69%", category: "主題" },
{ code: "00905", name: "FT臺灣Smart", period: "季配", dividend: "$0.900", compared: "▲0.280", yield: "6.60%", category: "主題" },
{ code: "00907", name: "永豐優息存股", period: "雙月配", dividend: "$1.442", compared: "▲0.496", yield: "9.02%", category: "高股息" },
{ code: "00908", name: "富邦入息REITs+", period: "季配", dividend: "$0.644", compared: "▲0.071", yield: "4.99%", category: "主題" },
{ code: "00909", name: "國泰數位支付服務", period: "年配", dividend: "$1.810", compared: "▲1.585", yield: "5.04%", category: "主題" },
{ code: "00911", name: "兆豐洲際半導體", period: "半年配", dividend: "$2.200", compared: "-", yield: "8.64%", category: "主題" },
{ code: "00912", name: "中信臺灣智慧50", period: "季配", dividend: "$1.380", compared: "▲0.510", yield: "7.26%", category: "主題" },
{ code: "00913", name: "兆豐台灣晶圓製造", period: "半年配", dividend: "$1.120", compared: "▲0.320", yield: "5.57%", category: "主題" },
{ code: "00915", name: "凱基優選高股息30", period: "季配", dividend: "$3.010", compared: "▲1.320", yield: "11.62%", category: "高股息" },
{ code: "00916", name: "國泰全球品牌50", period: "年配", dividend: "$0.220", compared: "▲0.050", yield: "0.88%", category: "國際" },
{ code: "00917", name: "中信特選金融", period: "年配", dividend: "$0.290", compared: "-", yield: "1.19%", category: "主題" },
{ code: "00918", name: "大華優利高填息30", period: "季配", dividend: "$3.120", compared: "▲1.500", yield: "12.85%", category: "高股息" },
{ code: "00919", name: "群益台灣精選高息", period: "季配", dividend: "$2.800", compared: "▲1.170", yield: "11.96%", category: "高股息" },
{ code: "00920", name: "富邦ESG綠色電力", period: "年配", dividend: "$0.040", compared: "-", yield: "0.29%", category: "主題" },
{ code: "00921", name: "兆豐龍頭等權重", period: "季配", dividend: "$1.800", compared: "▲0.830", yield: "9.99%", category: "市值" },
{ code: "00922", name: "國泰台灣領袖50", period: "半年配", dividend: "$1.380", compared: "▲0.810", yield: "6.48%", category: "市值" },
{ code: "00923", name: "群益台ESG低碳50", period: "半年配", dividend: "$1.153", compared: "▲0.592", yield: "5.39%", category: "市值" },
{ code: "00926", name: "凱基全球菁英55", period: "年配", dividend: "$1.500", compared: "▲1.270", yield: "6.36%", category: "國際" },
{ code: "00927", name: "群益半導體收益", period: "季配", dividend: "$1.880", compared: "▲1.440", yield: "10.51%", category: "高股息" },
{ code: "00928", name: "中信上櫃ESG30", period: "半年配", dividend: "$1.710", compared: "-", yield: "10.38%", category: "主題" },
{ code: "00929", name: "復華台灣科技優息", period: "月配", dividend: "$1.810", compared: "▲1.150", yield: "10.02%", category: "高股息" },
{ code: "00930", name: "永豐ESG低碳高息", period: "雙月配", dividend: "$2.034", compared: "-", yield: "11.18%", category: "高股息" },
{ code: "00932", name: "兆豐永續高息等權", period: "季配", dividend: "$1.690", compared: "-", yield: "10.75%", category: "高股息" },
{ code: "00934", name: "中信成長高股息", period: "月配", dividend: "$0.889", compared: "-", yield: "4.88%", category: "高股息" },
{ code: "00935", name: "野村臺灣新科技50", period: "半年配", dividend: "$0.600", compared: "-", yield: "2.73%", category: "主題" },
{ code: "00936", name: "台新永續高息中小", period: "月配", dividend: "$1.100", compared: "-", yield: "7.01%", category: "高股息" },
{ code: "00938", name: "凱基優選30", period: "季配", dividend: "-", compared: "-", yield: "-", category: "主題" },
{ code: "00939", name: "統一台灣高息動能", period: "月配", dividend: "$0.315", compared: "-", yield: "2.19%", category: "高股息" },
{ code: "00940", name: "元大台灣價值高息", period: "月配", dividend: "$0.280", compared: "-", yield: "2.96%", category: "高股息" },
{ code: "00943", name: "兆豐電子高息等權", period: "月配", dividend: "$0.475", compared: "-", yield: "3.21%", category: "高股息" },
{ code: "00944", name: "野村趨勢動能高息", period: "月配", dividend: "$0.348", compared: "-", yield: "2.40%", category: "高股息" },
{ code: "00946", name: "群益科技高息成長", period: "月配", dividend: "$0.270", compared: "-", yield: "2.93%", category: "高股息" },
{ code: "00947", name: "台新臺灣IC設計", period: "季配", dividend: "-", compared: "-", yield: "-", category: "主題" },
{ code: "00949", name: "復華日本龍頭", period: "年配", dividend: "-", compared: "-", yield: "-", category: "國際" },
{ code: "00951", name: "台新日本半導體", period: "年配", dividend: "-", compared: "-", yield: "-", category: "國際" },
{ code: "00952", name: "凱基台灣AI50", period: "月配", dividend: "-", compared: "-", yield: "-", category: "主題" },
{ code: "00954", name: "中信日本半導體", period: "年配", dividend: "-", compared: "-", yield: "-", category: "國際" },
{ code: "00955", name: "中信日本商社", period: "年配", dividend: "-", compared: "-", yield: "-", category: "國際" },
{ code: "00956", name: "中信日經高股息", period: "季配", dividend: "-", compared: "-", yield: "-", category: "國際" },
{ code: "00960", name: "野村全球航運龍頭", period: "季配", dividend: "-", compared: "-", yield: "-", category: "主題" },
{ code: "00961", name: "FT臺灣永續高息", period: "月配", dividend: "-", compared: "-", yield: "-", category: "高股息" },
{ code: "00962", name: "台新臺灣AI優息動能", period: "月配", dividend: "-", compared: "-", yield: "-", category: "主題" },
{ code: "00963", name: "中信全球高股息", period: "月配", dividend: "-", compared: "-", yield: "-", category: "高股息" },
{ code: "00964", name: "中信亞太高股息", period: "月配", dividend: "-", compared: "-", yield: "-", category: "高股息" },
{ code: "00965", name: "元大航太防衛科技", period: "年配", dividend: "-", compared: "-", yield: "-", category: "主題" },
{ code: "00679B", name: "元大美債20年", period: "季配", dividend: "$1.330", compared: "▲0.160", yield: "4.44%", category: "債券" },
{ code: "00687B", name: "國泰20年美債", period: "季配", dividend: "$1.480", compared: "▲0.320", yield: "4.70%", category: "債券" },
{ code: "00694B", name: "富邦美債1-3", period: "季配", dividend: "$0.877", compared: "▲0.107", yield: "2.08%", category: "債券" },
{ code: "00695B", name: "富邦美債7-10", period: "季配", dividend: "$0.868", compared: "▲0.326", yield: "2.40%", category: "債券" },
{ code: "00696B", name: "富邦美債20年", period: "季配", dividend: "$1.021", compared: "▲0.058", yield: "3.15%", category: "債券" },
{ code: "00697B", name: "元大美債7-10", period: "季配", dividend: "$1.070", compared: "▼0.250", yield: "2.91%", category: "債券" },
{ code: "00710B", name: "復華彭博非投等債", period: "季配", dividend: "$0.990", compared: "▼0.050", yield: "4.94%", category: "債券" },
{ code: "00711B", name: "復華彭博新興債", period: "季配", dividend: "$0.780", compared: "▲0.020", yield: "4.65%", category: "債券" },
{ code: "00718B", name: "富邦中國政策債", period: "半年配", dividend: "$0.679", compared: "▲0.065", yield: "3.26%", category: "債券" },
{ code: "00719B", name: "元大美債1-3", period: "季配", dividend: "$1.450", compared: "▲0.020", yield: "4.52%", category: "債券" },
{ code: "00720B", name: "元大投資級公司債", period: "季配", dividend: "$2.020", compared: "▲0.060", yield: "5.51%", category: "債券" },
{ code: "00721B", name: "元大中國債3-5", period: "半年配", dividend: "$1.000", compared: "▼0.240", yield: "2.08%", category: "債券" },
{ code: "00722B", name: "群益投資級電信債", period: "季配", dividend: "$1.937", compared: "▼0.026", yield: "4.84%", category: "債券" },
{ code: "00723B", name: "群益投資級科技債", period: "季配", dividend: "$1.691", compared: "▲0.111", yield: "4.86%", category: "債券" },
{ code: "00724B", name: "群益投資級金融債", period: "季配", dividend: "$1.809", compared: "▲0.065", yield: "5.01%", category: "債券" },
{ code: "00725B", name: "國泰投資級公司債", period: "季配", dividend: "$2.573", compared: "▲0.823", yield: "6.63%", category: "債券" },
{ code: "00726B", name: "國泰新興投等債", period: "季配", dividend: "$0.620", compared: "▼1.460", yield: "1.79%", category: "債券" },
{ code: "00727B", name: "國泰優選非投等債", period: "季配", dividend: "$0.570", compared: "▼1.550", yield: "1.38%", category: "債券" },
{ code: "00734B", name: "台新JPM新興債", period: "季配", dividend: "$0.720", compared: "▼0.190", yield: "4.49%", category: "債券" },
{ code: "00740B", name: "富邦全球投等債", period: "月配", dividend: "$2.643", compared: "▲0.656", yield: "6.31%", category: "債券" },
{ code: "00741B", name: "富邦全球非投等債", period: "月配", dividend: "$2.727", compared: "▲0.593", yield: "6.85%", category: "債券" },
{ code: "00746B", name: "富邦A級公司債", period: "季配", dividend: "$1.652", compared: "▲0.114", yield: "4.33%", category: "債券" },
{ code: "00749B", name: "凱基新興債10+", period: "季配", dividend: "$1.730", compared: "▲0.000", yield: "5.32%", category: "債券" },
{ code: "00750B", name: "凱基科技債10+", period: "季配", dividend: "$1.585", compared: "▲0.008", yield: "4.33%", category: "債券" },
{ code: "00751B", name: "元大AAA至A公司債", period: "季配", dividend: "$1.830", compared: "▲0.040", yield: "5.15%", category: "債券" },
{ code: "00754B", name: "群益AAA-AA公司債", period: "季配", dividend: "$1.747", compared: "▲0.123", yield: "4.66%", category: "債券" },
{ code: "00755B", name: "群益投資級公用債", period: "季配", dividend: "$1.814", compared: "▲0.106", yield: "5.04%", category: "債券" },
{ code: "00756B", name: "群益投等新興公債", period: "季配", dividend: "$1.989", compared: "▲0.101", yield: "6.00%", category: "債券" },
{ code: "00758B", name: "復華能源債", period: "季配", dividend: "$2.380", compared: "▲0.080", yield: "4.33%", category: "債券" },
{ code: "00759B", name: "復華製藥債", period: "季配", dividend: "$2.470", compared: "▲0.150", yield: "4.19%", category: "債券" },
{ code: "00760B", name: "復華新興企業債", period: "季配", dividend: "$2.840", compared: "▲0.040", yield: "5.04%", category: "債券" },
{ code: "00761B", name: "國泰A級公司債", period: "季配", dividend: "$1.940", compared: "▲0.630", yield: "5.15%", category: "債券" },
{ code: "00764B", name: "群益25年美債", period: "季配", dividend: "$1.199", compared: "▲0.146", yield: "3.78%", category: "債券" },
{ code: "00768B", name: "復華20年美債", period: "不配息", dividend: "-", compared: "-", yield: "-", category: "債券" },
{ code: "00772B", name: "中信高評級公司債", period: "月配", dividend: "$1.647", compared: "▲0.051", yield: "4.49%", category: "債券" },
{ code: "00773B", name: "中信優先金融債", period: "月配", dividend: "$1.708", compared: "▼0.014", yield: "4.45%", category: "債券" },
{ code: "00775B", name: "新光投等債15+", period: "季配", dividend: "$1.465", compared: "▲0.095", yield: "4.19%", category: "債券" },
{ code: "00777B", name: "凱基AAA至A公司債", period: "季配", dividend: "$1.645", compared: "▲0.240", yield: "4.51%", category: "債券" },
{ code: "00778B", name: "凱基金融債20+", period: "季配", dividend: "$1.715", compared: "▲0.095", yield: "4.51%", category: "債券" },
{ code: "00779B", name: "凱基美債25+", period: "季配", dividend: "$1.103", compared: "▲0.153", yield: "3.46%", category: "債券" },
{ code: "00780B", name: "國泰A級金融債", period: "季配", dividend: "$1.420", compared: "▼0.020", yield: "3.69%", category: "債券" },
{ code: "00781B", name: "國泰A級科技債", period: "季配", dividend: "$1.760", compared: "▲0.090", yield: "5.31%", category: "債券" },
{ code: "00782B", name: "國泰A級公用債", period: "季配", dividend: "$1.730", compared: "▼0.010", yield: "5.06%", category: "債券" },
{ code: "00784B", name: "富邦中國投等債", period: "季配", dividend: "$0.897", compared: "▼0.325", yield: "2.28%", category: "債券" },
{ code: "00785B", name: "富邦金融投等債", period: "季配", dividend: "$1.721", compared: "▲0.138", yield: "4.62%", category: "債券" },
{ code: "00786B", name: "元大10年IG銀行債", period: "季配", dividend: "$1.955", compared: "▲0.075", yield: "5.58%", category: "債券" },
{ code: "00787B", name: "元大10年IG醫療債", period: "季配", dividend: "$2.070", compared: "▲0.230", yield: "5.84%", category: "債券" },
{ code: "00788B", name: "元大10年IG電能債", period: "季配", dividend: "$1.850", compared: "▲0.005", yield: "5.59%", category: "債券" },
{ code: "00789B", name: "復華公司債A3", period: "季配", dividend: "$2.436", compared: "▲0.203", yield: "4.52%", category: "債券" },
{ code: "00790B", name: "復華次順位金融債", period: "季配", dividend: "$2.388", compared: "▲0.077", yield: "4.16%", category: "債券" },
{ code: "00791B", name: "復華信用債1-5", period: "季配", dividend: "$2.212", compared: "▲0.118", yield: "3.84%", category: "債券" },
{ code: "00792B", name: "群益A級公司債", period: "季配", dividend: "$1.725", compared: "▲0.216", yield: "4.91%", category: "債券" },
{ code: "00793B", name: "群益AAA-A醫療債", period: "季配", dividend: "$1.623", compared: "▲0.100", yield: "4.79%", category: "債券" },
{ code: "00794B", name: "群益7+中國政金債", period: "季配", dividend: "$1.529", compared: "▼0.687", yield: "3.69%", category: "債券" },
{ code: "00795B", name: "中信美國公債20年", period: "季配", dividend: "$1.530", compared: "▲0.431", yield: "5.03%", category: "債券" },
{ code: "00799B", name: "國泰A級醫療債", period: "季配", dividend: "$1.810", compared: "▲0.050", yield: "5.42%", category: "債券" },
{ code: "00834B", name: "第一金金融債10+", period: "季配", dividend: "$1.645", compared: "▲0.115", yield: "4.53%", category: "債券" },
{ code: "00836B", name: "永豐10年A公司債", period: "季配", dividend: "$1.535", compared: "▲0.322", yield: "4.82%", category: "債券" },
{ code: "00840B", name: "凱基IG精選15+", period: "季配", dividend: "$1.460", compared: "▲0.170", yield: "4.41%", category: "債券" },
{ code: "00841B", name: "凱基AAA-AA公司債", period: "季配", dividend: "$1.340", compared: "▲0.180", yield: "4.11%", category: "債券" },
{ code: "00842B", name: "台新美元銀行債", period: "季配", dividend: "$1.790", compared: "▼0.070", yield: "5.22%", category: "債券" },
{ code: "00844B", name: "新光15年IG金融債", period: "季配", dividend: "$1.750", compared: "▲0.415", yield: "5.15%", category: "債券" },
{ code: "00845B", name: "富邦新興投等債", period: "季配", dividend: "$1.498", compared: "▲0.054", yield: "4.40%", category: "債券" },
{ code: "00846B", name: "富邦歐洲銀行債", period: "季配", dividend: "$1.718", compared: "▲0.353", yield: "4.67%", category: "債券" },
{ code: "00847B", name: "中信美國市政債", period: "季配", dividend: "$1.140", compared: "▲0.023", yield: "4.01%", category: "債券" },
{ code: "00848B", name: "中信新興亞洲債", period: "季配", dividend: "$1.700", compared: "▲0.090", yield: "4.70%", category: "債券" },
{ code: "00849B", name: "中信EM主權債0-5", period: "季配", dividend: "$1.279", compared: "▼0.021", yield: "3.37%", category: "債券" },
{ code: "00853B", name: "統一美債10年Aa-A", period: "季配", dividend: "$1.290", compared: "▼0.040", yield: "4.24%", category: "債券" },
{ code: "00856B", name: "永豐1-3年美公債", period: "季配", dividend: "$1.719", compared: "▼0.004", yield: "4.38%", category: "債券" },
{ code: "00857B", name: "永豐20年美公債", period: "季配", dividend: "$1.176", compared: "▼0.109", yield: "4.49%", category: "債券" },
{ code: "00859B", name: "群益0-1年美債", period: "季配", dividend: "$1.479", compared: "▲0.398", yield: "3.44%", category: "債券" },
{ code: "00860B", name: "群益1-5Y投資級債", period: "季配", dividend: "$2.028", compared: "▲0.044", yield: "5.16%", category: "債券" },
{ code: "00862B", name: "中信投資級公司債", period: "季配", dividend: "$1.714", compared: "▲0.219", yield: "4.92%", category: "債券" },
{ code: "00863B", name: "中信全球電信債", period: "季配", dividend: "$1.630", compared: "▲0.157", yield: "4.60%", category: "債券" },
{ code: "00864B", name: "中信美國公債0-1", period: "不配息", dividend: "-", compared: "-", yield: "-", category: "債券" },
{ code: "00865B", name: "國泰US短期公債", period: "不配息", dividend: "-", compared: "-", yield: "-", category: "債券" },
{ code: "00867B", name: "新光A-BBB電信債", period: "季配", dividend: "$1.500", compared: "▲0.035", yield: "4.37%", category: "債券" },
{ code: "00870B", name: "元大15年EM主權債", period: "季配", dividend: "$1.540", compared: "▲0.100", yield: "5.09%", category: "債券" },
{ code: "00883B", name: "中信ESG投資級債", period: "月配", dividend: "$1.492", compared: "▲0.107", yield: "4.42%", category: "債券" },
{ code: "00884B", name: "中信低碳新興債", period: "季配", dividend: "$1.139", compared: "▼0.267", yield: "3.61%", category: "債券" },
{ code: "00890B", name: "凱基ESGBBB債15+", period: "季配", dividend: "$1.890", compared: "▲0.070", yield: "5.30%", category: "債券" },
{ code: "00931B", name: "統一美債20年", period: "季配", dividend: "$0.525", compared: "▲0.435", yield: "3.48%", category: "債券" },
{ code: "00933B", name: "國泰10Y+金融債", period: "月配", dividend: "$0.975", compared: "-", yield: "5.65%", category: "債券" },
{ code: "00937B", name: "群益ESG投等債20+", period: "月配", dividend: "$0.914", compared: "-", yield: "5.59%", category: "債券" },
{ code: "00942B", name: "台新美A公司債20+", period: "月配", dividend: "$0.518", compared: "-", yield: "3.27%", category: "債券" },
{ code: "00945B", name: "凱基美國非投等債", period: "月配", dividend: "$0.612", compared: "-", yield: "3.96%", category: "債券" },
{ code: "00948B", name: "中信優息投資級債", period: "月配", dividend: "$0.265", compared: "-", yield: "2.55%", category: "債券" },
{ code: "00950B", name: "凱基A級公司債", period: "月配", dividend: "$0.162", compared: "-", yield: "1.05%", category: "債券" },
{ code: "00953B", name: "群益優選非投等債", period: "月配", dividend: "$0.140", compared: "-", yield: "1.35%", category: "債券" },
{ code: "00957B", name: "兆豐US優選投等債", period: "月配", dividend: "-", compared: "-", yield: "-", category: "債券" },
{ code: "00958B", name: "永豐ESG銀行債15+", period: "月配", dividend: "$0.084", compared: "-", yield: "0.85%", category: "債券" },
{ code: "00959B", name: "大華投等美債15Y+", period: "月配", dividend: "$0.107", compared: "-", yield: "1.05%", category: "債券" }];



const categories = ["全部", "市值型", "高股息", "主題型", "國際型", "債券"];

const FloatingBanner = () => /*#__PURE__*/
React.createElement(React.Fragment, null, /*#__PURE__*/
React.createElement("a", {
  href: "https://etfchoice.page.link/PfQr",
  target: "_blank",
  rel: "noopener noreferrer",
  className: "floating-banner pc-banner" }, /*#__PURE__*/

React.createElement("img", { src: "https://i.imgur.com/e8PGBTr.png", alt: "ETF Choice Banner for PC" })), /*#__PURE__*/

React.createElement("a", {
  href: "https://etfchoice.page.link/1B71",
  target: "_blank",
  rel: "noopener noreferrer",
  className: "floating-banner mobile-banner" }, /*#__PURE__*/

React.createElement("img", { src: "https://i.imgur.com/FCp4VrN.png", alt: "ETF Choice Banner for Mobile" })));




const ETFDividendTool = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('全部');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [sortConfig, setSortConfig] = useState({ key: 'code', direction: 'ascending' });

  const periods = useMemo(() => {
    const uniquePeriods = new Set(etfData.map(etf => etf.period));
    return ['全部', ...Array.from(uniquePeriods)];
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(etfData.map(etf => etf.category));
    return ['全部', ...Array.from(uniqueCategories)];
  }, []);

  const filteredETFs = useMemo(() => {
    return etfData.filter((etf) =>
    (etf.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    etf.name.toLowerCase().includes(searchTerm.toLowerCase())) && (
    selectedPeriod === '全部' || etf.period === selectedPeriod) && (
    selectedCategory === '全部' || etf.category === selectedCategory));

  }, [searchTerm, selectedPeriod, selectedCategory]);

  const getComparedColor = compared => {
    if (compared.includes('▲')) return 'text-red-500';
    if (compared.includes('▼')) return 'text-green-500';
    if (compared.includes('▲0.000')) return 'text-black';
    return 'text-black';
  };

  const parsePercentage = value => {
    if (value === "-") return Number.NEGATIVE_INFINITY;
    if (typeof value === 'string' && value.includes('%')) {
      return parseFloat(value.replace('%', ''));
    }
    return value;
  };

  const sortedETFs = useMemo(() => {
    let sortableItems = [...filteredETFs];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aValue = parsePercentage(a[sortConfig.key]);
        let bValue = parsePercentage(b[sortConfig.key]);

        if (sortConfig.key === 'compared') {
          aValue = a[sortConfig.key] === '-' ? Number.NEGATIVE_INFINITY : parseFloat(a[sortConfig.key].replace('▲', '').replace('▼', ''));
          bValue = b[sortConfig.key] === '-' ? Number.NEGATIVE_INFINITY : parseFloat(b[sortConfig.key].replace('▲', '').replace('▼', ''));
        } else if (sortConfig.key === 'dividend') {
          aValue = a[sortConfig.key] === '-' ? Number.NEGATIVE_INFINITY : parseFloat(a[sortConfig.key].replace('$', '').replace(',', ''));
          bValue = b[sortConfig.key] === '-' ? Number.NEGATIVE_INFINITY : parseFloat(b[sortConfig.key].replace('$', '').replace(',', ''));
        }

        if (aValue === Number.NEGATIVE_INFINITY && bValue === Number.NEGATIVE_INFINITY) return 0;
        if (aValue === Number.NEGATIVE_INFINITY) return 1;
        if (bValue === Number.NEGATIVE_INFINITY) return -1;

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredETFs, sortConfig]);

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortDirection = name => {
    if (!sortConfig.key) {
      return '⇅';
    }
    return sortConfig.key === name ? sortConfig.direction === 'ascending' ? '↑' : '↓' : '⇅';
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "p-4 max-w-full mx-auto etf-tool-container main-content" }, /*#__PURE__*/
    React.createElement("h1", { className: "title mb-4 sm:mb-6" }, "2024 ETF \u914D\u606F\u5E74\u8868\u67E5\u8A62\u5DE5\u5177"), /*#__PURE__*/

    React.createElement("div", { className: "filter-section" }, /*#__PURE__*/
    React.createElement("input", {
      type: "text",
      placeholder: "\u8F38\u5165 ETF \u4EE3\u78BC\u6216\u540D\u7A31",
      value: searchTerm,
      onChange: e => setSearchTerm(e.target.value),
      className: "search-input w-full max-w-md mx-auto block mb-4" }), /*#__PURE__*/


    React.createElement("div", { className: "mb-4" }, /*#__PURE__*/
    React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "\u914D\u606F\u9031\u671F\u7BE9\u9078"), /*#__PURE__*/
    React.createElement("div", { className: "flex flex-wrap gap-2" },
    periods.map((period) => /*#__PURE__*/
    React.createElement("button", {
      key: period,
      onClick: () => setSelectedPeriod(period),
      className: `filter-button ${
      selectedPeriod === period ?
      'bg-blue-600 text-white' :
      'bg-gray-200 text-gray-700'
      }` },

    period)))), /*#__PURE__*/





    React.createElement("div", null, /*#__PURE__*/
    React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "\u985E\u5225\u7BE9\u9078"), /*#__PURE__*/
    React.createElement("div", { className: "flex flex-wrap gap-2" },
    categories.map((category) => /*#__PURE__*/
    React.createElement("button", {
      key: category,
      onClick: () => setSelectedCategory(category),
      className: `filter-button ${
      selectedCategory === category ?
      'bg-blue-600 text-white' :
      'bg-gray-200 text-gray-700'
      }` },

    category))))), /*#__PURE__*/









    React.createElement("div", { className: "overflow-x-auto table-container" }, /*#__PURE__*/
    React.createElement("div", { className: "text-right text-base text-gray-600 mb-2" }, "\"-\"\u8868\u793A\u8A72\u5E74\u672A\u914D\u606F\u6216\u5C1A\u672A\u958B\u59CB\u914D\u606F"), /*#__PURE__*/


    React.createElement("table", { className: "w-full bg-white shadow-md rounded text-base sm:text-lg table-container" }, /*#__PURE__*/
    React.createElement("thead", { className: "bg-gray-100" }, /*#__PURE__*/
    React.createElement("tr", null, /*#__PURE__*/
    React.createElement("th", { onClick: () => requestSort('code'), className: "px-2 py-2 sm:px-4 sm:py-3 text-center cursor-pointer table-cell" }, "\u4EE3\u865F ", getSortDirection('code')), /*#__PURE__*/
    React.createElement("th", { onClick: () => requestSort('name'), className: "px-2 py-2 sm:px-4 sm:py-3 text-center cursor-pointer table-cell" }, "\u540D\u7A31 ", getSortDirection('name')), /*#__PURE__*/
    React.createElement("th", { onClick: () => requestSort('period'), className: "px-2 py-2 sm:px-4 sm:py-3 text-center cursor-pointer table-cell" }, "\u914D\u606F\u9031\u671F ", getSortDirection('period')), /*#__PURE__*/
    React.createElement("th", { onClick: () => requestSort('dividend'), className: "px-2 py-2 sm:px-4 sm:py-3 text-center cursor-pointer table-cell" }, "\u4ECA\u5E74\u914D\u606F ", getSortDirection('dividend')), /*#__PURE__*/
    React.createElement("th", { onClick: () => requestSort('compared'), className: "px-2 py-2 sm:px-4 sm:py-3 text-center cursor-pointer table-cell" }, "\u76F8\u8F03\u53BB\u5E74 ", getSortDirection('compared')), /*#__PURE__*/
    React.createElement("th", { onClick: () => requestSort('yield'), className: "px-2 py-2 sm:px-4 sm:py-3 text-center cursor-pointer table-cell" }, "\u5E74\u5316\u6B96\u5229\u7387 ", getSortDirection('yield')), /*#__PURE__*/
    React.createElement("th", { onClick: () => requestSort('category'), className: "px-2 py-2 sm:px-4 sm:py-3 text-center cursor-pointer table-cell" }, "\u985E\u5225 ", getSortDirection('category')))), /*#__PURE__*/


    React.createElement("tbody", null,
    sortedETFs.map((etf) => /*#__PURE__*/
    React.createElement("tr", { key: etf.code, className: "border-b" }, /*#__PURE__*/
    React.createElement("td", { className: "px-2 py-2 sm:px-4 sm:py-3 text-center table-cell" }, etf.code), /*#__PURE__*/
    React.createElement("td", { className: "px-2 py-2 sm:px-4 sm:py-3 text-center table-cell" }, etf.name), /*#__PURE__*/
    React.createElement("td", { className: "px-2 py-2 sm:px-4 sm:py-3 text-center table-cell" }, etf.period), /*#__PURE__*/
    React.createElement("td", { className: "px-2 py-2 sm:px-4 sm:py-3 text-center table-cell" }, etf.dividend), /*#__PURE__*/
    React.createElement("td", { className: `px-2 py-2 sm:px-4 sm:py-3 text-center ${getComparedColor(etf.compared)} table-cell` }, etf.compared), /*#__PURE__*/
    React.createElement("td", { className: "px-2 py-2 sm:px-4 sm:py-3 text-center table-cell" }, etf.yield), /*#__PURE__*/
    React.createElement("td", { className: "px-2 py-2 sm:px-4 sm:py-3 text-center table-cell" }, etf.category)))))), /*#__PURE__*/






    React.createElement("div", { className: "mt-4 text-center text-gray-600 text-sm" }, "\u672C\u5DE5\u5177\u7531 ETF\u5B58\u80A1\u8A08\u756B\u5C0F\u7DE8 \u88FD\u4F5C"), /*#__PURE__*/


    React.createElement(FloatingBanner, null)));


};

ReactDOM.render( /*#__PURE__*/React.createElement(ETFDividendTool, null), document.getElementById('root'));
