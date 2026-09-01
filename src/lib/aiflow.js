import AIFlowClient from '@devvibex/aiflow';
export const aiflow1974 = new AIFlowClient({
  appId: 'ck-HSwisu22q8pbLpDXlITYPkCFGvIvKhqFLVmqa3-EK28',
  baseUrl: 'https://app.vibe-x.app/v1/aiflow',
  endUserId: (typeof localStorage !== 'undefined' && localStorage.getItem('user_id')) || undefined,
  appUserToken: (typeof localStorage !== 'undefined' && localStorage.getItem('access_token')) || undefined,
});
export const aiflow1974ConfigPromise = aiflow1974.getConfig().catch((err) => {
  console.warn('AIFlow config preload failed:', err?.message);
  return null;
});
export const aiflow1973 = new AIFlowClient({
  appId: 'ck-mnOBSsgqDDoRSeJXt-nP98E9e7SPunrrJXN5-Ydn-cs',
  baseUrl: 'https://app.vibe-x.app/v1/aiflow',
  endUserId: (typeof localStorage !== 'undefined' && localStorage.getItem('user_id')) || undefined,
  appUserToken: (typeof localStorage !== 'undefined' && localStorage.getItem('access_token')) || undefined,
});
export const aiflow1973ConfigPromise = aiflow1973.getConfig().catch((err) => {
  console.warn('AIFlow config preload failed:', err?.message);
  return null;
});
export const aiflowClients = [
  aiflow1974,
  aiflow1973,
];